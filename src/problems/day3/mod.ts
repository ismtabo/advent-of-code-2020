import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function main(text: string, isPart2: boolean) {
  const map = text.split("\n");
  if (isPart2) {
    return partTwo(map);
  }
  return partOne(map);
}

export { partOne, partTwo };
