import { parse } from "https://deno.land/std/flags/mod.ts";
import { existsSync } from "https://deno.land/std/fs/mod.ts";
import { dirname } from "https://deno.land/std/path/mod.ts";

const __dirname = dirname(new URL(import.meta.url).pathname);

async function main() {
  const args = parse(
    Deno.args,
    { boolean: ["part1", "part2"], alias: { day: "d" } },
  );
  if (
    args._.length !== 1 || !("day" in args) ||
    (!["part1", "part2"].some((option) => option in args) &&
      !["part1", "part2"].every((option) => option in args))
  ) {
    printUsage(1);
  }

  if (!existsSync(args._[0] as string)) {
    console.error('Error - input file "{' + args._[0] + '}" does not exists');
    Deno.exit(1);
  }

  const day = +args.day;
  const module = await loadModule(day);
  const text = Deno.readTextFileSync(args._[0] as string);

  console.log(module.main(text, args.part2 && !args.part1));
  Deno.exit(0);
}

function printUsage(exitCode: number) {
  console.log(`\
  Usage:
  deno run --allow-read ${Deno.execPath()} [-d <day>] [--part1|--part2] inputFile
  `);
  Deno.exit(exitCode);
}

async function loadModule(day: number) {
  const dayModuleName = `day${day}`;
  const problems = await import(`${__dirname}/../problems/mod.ts`);
  if (!(dayModuleName in problems)) {
    console.error(`Error - Day ${day} not found`);
    console.error(
      `Available days: ${
        Object.keys(problems).join(", ").replaceAll("day", "")
      }`,
    );
    Deno.exit(1);
  }
  return await problems[dayModuleName];
}

main();
