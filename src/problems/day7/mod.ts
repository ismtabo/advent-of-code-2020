import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function main(text: string, isPart2: boolean) {
  const cases = text.split("\n");
  if (isPart2) {
    return partTwo(cases);
  }
  return partOne(cases);
}

export { partOne, partTwo };
