import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export const config = {
  sampleExtraOptions: { preamble: 5 },
};

export function preprocess(text: string) {
  return text.split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => parseInt(line));
}

export function main(
  text: string,
  isPart2: boolean,
  options: { preamble: number } = { preamble: 25 },
) {
  const numbers = preprocess(text);
  if (isPart2) {
    return partTwo(numbers, options);
  }
  return partOne(numbers, options);
}

export { partOne, partTwo };
