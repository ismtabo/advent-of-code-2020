import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function main(text: string, isPart2: boolean) {
  const numbers = text.split("\n")
    .filter((line) => line.length > 0)
    .map(
      (line) => parseInt(line),
    );
  if (isPart2) {
    return partTwo(numbers);
  }
  return partOne(numbers);
}
