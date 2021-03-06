import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Case } from "./types.d.ts";

export function preprocess(text: string): Case[] {
  return text.split("\n").filter((line) =>
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
}

export function main(text: string, isPart2: boolean) {
  const cases = preprocess(text);
  if (isPart2) {
    return partTwo(cases);
  }
  return partOne(cases);
}

export { partOne, partTwo };
