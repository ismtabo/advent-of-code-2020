import {
  ensureDirSync,
  exists,
  existsSync,
} from "https://deno.land/std/fs/mod.ts";
import { dirname, join } from "https://deno.land/std/path/mod.ts";
import { Command } from "https://deno.land/x/cliffy/command/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs@0.9.3/mod.ts";
import {
  Result,
  ResultDay,
  RunOptions,
  Solution,
  SolutionPart,
  Solutions,
} from "./types.d.ts";

const __dirname = dirname(new URL(import.meta.url).pathname);
const SOLUTIONS_PATH = join(__dirname, "../solutions");
const SOLUTIONS_MODULE = join(SOLUTIONS_PATH, "mod.ts");

function extractDayNumber(day: string) {
  return +((day.match(/(?<=day)\d+/) || [])[0] || NaN);
}

function dayKey(day: number) {
  return `day${day}`;
}

async function listDays() {
  const solutions = await import(SOLUTIONS_MODULE);
  const days = Array.from(Object.keys(solutions)).map((day) =>
    extractDayNumber(day)
  );
  return days;
}

async function loadSolutionsModules(): Promise<Solutions> {
  return import(SOLUTIONS_MODULE);
}

async function loadModule(day: number): Promise<Solution> {
  const dayName = dayKey(day);
  const dayModule = join(SOLUTIONS_PATH, dayName, "mod.ts");
  if (!existsSync(dayModule)) {
    console.error(`Day ${day} module not found`);
    Deno.exit(1);
  }
  return await import(dayModule);
}

function readDaySampleInput(day: number) {
  const dayName = dayKey(day);
  const daySampleInput = join(SOLUTIONS_PATH, dayName, "sample.txt");
  if (!existsSync(daySampleInput)) {
    console.error(`Day ${day} sample input not found`);
    Deno.exit(1);
  }
  return Deno.readTextFileSync(daySampleInput);
}

function readDayInput(day: number) {
  const dayName = dayKey(day);
  const daySampleInput = join(SOLUTIONS_PATH, dayName, "input.txt");
  if (!existsSync(daySampleInput)) {
    console.error(`Day ${day} input not found`);
    Deno.exit(1);
  }
  return Deno.readTextFileSync(daySampleInput);
}

function runWithTime<T>(fn: () => Result<T>): Result<T> {
  const startTime = performance.now();
  const result = fn();
  const time = performance.now() - startTime;
  return { ...result, time };
}

function runPart<Input, Output>(
  part: SolutionPart<Input, Output>,
  input: Input,
  { time: time = false }: Pick<RunOptions, "time">,
): Result<Output> {
  return !time
    ? { result: part(input) }
    : runWithTime(() => ({ result: part(input) }));
}

function runModule(
  module: Solution,
  text: string,
  { part, time }: Pick<RunOptions, "part" | "time">,
): Result {
  return !time
    ? { result: module.main(text, part === 2) }
    : runWithTime(() => ({ result: module.main(text, part === 2) }));
}

function runAllParts(
  module: Solution,
  text: string,
  { time = false }: Pick<RunOptions, "time">,
): ResultDay {
  const input = module.preprocess(text);
  const partOne = runPart(module.partOne, input, { time });
  const partTwo = runPart(module.partTwo, input, { time });
  return { partOne, partTwo };
}

async function runAllDays(
  { time = false, part, allParts = false, sample }: RunOptions,
) {
  const daysSolutions = await loadSolutionsModules();
  const result = Object.entries(daysSolutions)
    .map(([day, solution]) => ({ day: extractDayNumber(day), solution }))
    .sort(({ day }, { day: other }) => day - other)
    .map(
      ({ day, solution }) => {
        const text = sample ? readDaySampleInput(day) : readDayInput(day);
        console.assert(
          "preprocess" in solution,
          "preprocess does not exist in day " + day,
        );
        return {
          [dayKey(day)]: allParts
            ? runAllParts(solution, text, { time })
            : runModule(solution, text, { part, time }),
        };
      },
    ).reduce((acc, val) => ({ ...acc, ...val }));
  console.log(result);
  Deno.exit(0);
}

async function runDay(
  day: number,
  file: string,
  { part, allParts, time, sample }: RunOptions,
) {
  const module: Solution = await loadModule(day);
  const text = file
    ? Deno.readTextFileSync(file)
    : sample
    ? readDaySampleInput(day)
    : readDayInput(day);
  const result = allParts
    ? runAllParts(module, text, { time })
    : runModule(module, text, { part, time });
  console.log(result);
  Deno.exit(0);
}

async function createDay(day: number) {
  if (day == null) {
    const days = await listDays();
    day = Math.max(...days) + 1;
  }

  const mainFolder = join(SOLUTIONS_PATH, `day${day}`);

  if (await exists(mainFolder)) {
    console.error(`Error - Day ${day} already exists`);
    Deno.exit(1);
  }

  ensureDirSync(mainFolder);

  Deno.writeTextFileSync(
    join(mainFolder, "mod.ts"),
    await renderFileToString(
      join(__dirname, "templates/main-mod.template"),
      {},
    ),
  );

  for (const part of ["partOne", "partTwo"]) {
    ensureDirSync(join(mainFolder, part));
    Deno.writeTextFileSync(
      join(mainFolder, part, "mod.ts"),
      await renderFileToString(
        join(__dirname, "templates/part-mod.template"),
        { partName: part },
      ),
    );
  }

  const solutionsModule = Deno.readTextFileSync(SOLUTIONS_MODULE);
  const solutionsModuleLines = solutionsModule.split("\n");
  solutionsModuleLines.splice(
    -1,
    0,
    `export * as day${day} from "./day${day}/mod.ts";`,
  );
  Deno.writeTextFileSync(SOLUTIONS_MODULE, solutionsModuleLines.join("\n"));
  Deno.run({ cmd: ["deno", "fmt", SOLUTIONS_MODULE] });
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
        .option("-d, --day <day:number>", "Day to run")
        .option(
          "-p, --part <part:number>",
          "Execute part 2 of the day",
          { default: 1 },
        )
        .option(
          "-a, --all-parts",
          "Execute both parts. If present part option will be ignore.",
        )
        .option("-t, --time", "Show spent time")
        .option(
          "-f, --file <file:string>",
          "Input file. If missing, the day input file is used instead.",
        )
        .option(
          "--sample",
          "Run day using sample input instead of day input file.",
          { conflicts: ["file"] },
        )
        .action(({ day, part, allParts, time, sample }, file) =>
          runDay(day, file, { part, allParts, time, sample })
        ),
    )
    .command(
      "run-all",
      new Command()
        .description("Run multiple day solution")
        .option(
          "-p, --part <part:number>",
          "Execute part 2 of the day",
          { default: 1 },
        )
        .option(
          "-a, --all-parts",
          "Execute both parts. If present part option will be ignore.",
        )
        .option("-t, --time", "Show spent time")
        .option(
          "--sample",
          "Run day using sample input instead of day input file.",
        )
        .action((options) => runAllDays(options)),
    )
    .command(
      "new",
      new Command()
        .description("Create new day solution folder skeleton")
        .option(
          "-d, --day <day:number>",
          "Day of the solution. By default the corresponding next day will be created.",
        )
        .action(({ day }) => createDay(day)),
    )
    .parse(Deno.args);
} catch (error) {
  console.error(error);
}
