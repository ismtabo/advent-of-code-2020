import { partOne } from "./partOne/index.ts";
import { partTwo } from "./partTwo/index.ts";

const RE_OPERATION = /([a-z]+)\s((?:\+|\-)\d+)/;

export function main(text: string, isPart2: boolean) {
  const instructions = text.split("\n")
    .filter((line) => line.length > 0)
    .map(
      (line) => {
        const [_, operation, arg] = line.match(RE_OPERATION) || [];
        return { name: operation, arg: parseInt(arg) };
      },
    );
  if (isPart2) {
    return partTwo(instructions);
  }
  return partOne(instructions);
}
