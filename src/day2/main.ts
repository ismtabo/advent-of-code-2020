import { parse } from "https://deno.land/std/flags/mod.ts";
import { partOne } from "./partOne/index.ts";
import { partTwo } from "./partTwo/index.ts";

function main() {
  const args = parse(Deno.args, { boolean: ["part1", "part2"] });
  if (
    args._.length !== 1 || !["part1", "part2"].some((option) => option in args)
  ) {
    printUsage(1);
  }

  const text = Deno.readTextFileSync(args._[0] as string);
  const cases = text.split("\n").filter((line) =>
    /^(\d+)-(\d+)\s(\w): (\w+)$/.test(line)
  ).map(
    (line) => {
      const match = line.match(
        /^(\d+)-(\d+)\s(\w): (\w+)$/,
      );
      const min = match != null ? match[1] : 0;
      const max = match != null ? match[2] : 0;
      const letter = match != null ? match[3] : "";
      const password = match != null ? match[4] : "";
      return {
        rule: { min: +min, max: +max, letter },
        password,
      };
    },
  );
  if (args.part2) {
    console.log(partTwo(cases));
    Deno.exit(0);
  }
  console.log(partOne(cases));
  Deno.exit(0);
}

function printUsage(exitCode: number) {
  console.log(`\
  Usage:
  deno run --allow-read ${Deno.execPath()} [--part1|--part2] inputFile
  `);
  Deno.exit(exitCode);
}

main();
