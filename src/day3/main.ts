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
  const map = text.split("\n");
  if (args.part2) {
    console.log(partTwo(map));
    Deno.exit(0);
  }
  console.log(partOne(map));
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
