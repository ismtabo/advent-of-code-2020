import { partOne } from "./partOne/index.ts";
import { partTwo } from "./partTwo/index.ts";

export function main(text: string, isPart2: boolean) {
  const numbers = text.split("\n").map(Number);
  if (isPart2) {
    return partTwo(numbers);
  }
  return partOne(numbers);
}
