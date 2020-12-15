import { dirname, join } from "https://deno.land/std/path/mod.ts";
import { ensureDir, exists } from "https://deno.land/std/fs/mod.ts";
import { Command } from "https://deno.land/x/cliffy/command/mod.ts";
import { CLIOptions } from "./types.d.ts";
import { renderFileToString } from "https://deno.land/x/dejs@0.9.3/mod.ts";

const __dirname = dirname(new URL(import.meta.url).pathname);

async function loadModule(day: number) {
  const dayModuleName = `day${day}`;
  const problems = await import(`${__dirname}/../problems/mod.ts`);
  if (!(dayModuleName in problems)) {
    console.error(`Day ${day} not found`);
    console.error(
      `Available days: ${
        Array.of(...Object.keys(problems))
          .map((day) => day.match(/(?<=day)\d+/) || [])
          .map(([day]) => +day)
          .sort((a, b) => a - b)
          .join(", ")
      }`,
    );
    Deno.exit(1);
  }
  return await problems[dayModuleName];
}

async function main({ day, part2, file }: CLIOptions) {
  const module = await loadModule(day);
  const text = Deno.readTextFileSync(file);
  console.log(module.main(text, part2));
  Deno.exit(0);
}

async function createDay(day: number) {
  const mainFolder = join(__dirname, `../problems/day${day}`);

  if (await exists(mainFolder)) {
    console.error(`Error - Day ${day} already exists`);
    Deno.exit(1);
  }

  await ensureDir(mainFolder);

  Deno.writeTextFileSync(
    join(mainFolder, "mod.ts"),
    await renderFileToString(
      join(__dirname, "templates/main-mod.template"),
      {},
    ),
  );

  for (const part of ["partOne", "partTwo"]) {
    await ensureDir(join(mainFolder, part));
    Deno.writeTextFileSync(
      join(mainFolder, part, "mod.ts"),
      await renderFileToString(
        join(__dirname, "templates/part-mod.template"),
        { partName: part },
      ),
    );
  }
}

try {
  await new Command()
    .name("aoc2020")
    .version("0.1.0")
    .description("Solutions for Advent of Code 2020. https://adventofcode.com/")
    .command(
      "run",
      new Command()
        .description("Run day solution")
        .option("-d, --day <day:number:day>", "Day to run")
        .option(
          "--part2",
          "Execute part 2 of the day",
        )
        .arguments("<file>")
        .action(({ day, part2 }, file) => main({ day, part2, file })),
    )
    .command(
      "create",
      new Command()
        .description("Create day solution folder skeleton")
        .arguments("<day:number>")
        .action((_, day) => createDay(day)),
    )
    .parse(Deno.args);
} catch (error) {
  console.error(error);
}
