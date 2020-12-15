import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string) {
  return text.split("\n\n").filter(Boolean);
}

export function main(text: string, isPart2: boolean) {
  const cases = preprocess(text);
  if (isPart2) {
    return partTwo(cases);
  }
  return partOne(cases);
}

export { partOne, partTwo };
