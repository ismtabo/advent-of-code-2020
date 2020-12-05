import { partOne } from "./partOne/index.ts";
import { partTwo } from "./partTwo/index.ts";

export function main(text: string, isPart2: boolean) {
  const map = text.split("\n");
  if (isPart2) {
    return partTwo(map);
  }
  return partOne(map);
}
