import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Operation } from "./types.d.ts";

const RE_OPERATION = /([a-z]+)\s((?:\+|\-)\d+)/;

export function preprocess(text: string): Operation[] {
  return text.split("\n")
    .filter((line) => line.length > 0)
    .map(
      (line) => {
        const [_, operation, arg] = line.match(RE_OPERATION) || [];
        return { name: operation, arg: parseInt(arg) };
      },
    );
}

export function main(text: string, isPart2: boolean) {
  const instructions = preprocess(text);
  if (isPart2) {
    return partTwo(instructions);
  }
  return partOne(instructions);
}

export { partOne, partTwo };
