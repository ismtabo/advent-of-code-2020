import { partOne } from "./partOne/index.ts";
import { partTwo } from "./partTwo/index.ts";

export function main(text: string, isPart2: boolean) {
  const cases = text.split("\n").map((line) => line.trim()).filter(Boolean);
  if (isPart2) {
    return partTwo(cases);
  }
  return partOne(cases);
}
