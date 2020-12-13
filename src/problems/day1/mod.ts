import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string) {
  return text.split("\n").map(Number);
}

export function main(text: string, isPart2: boolean) {
  const numbers = preprocess(text);
  if (isPart2) {
    return partTwo(numbers);
  }
  return partOne(numbers);
}

export { partOne, partTwo };
