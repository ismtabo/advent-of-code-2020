import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string) {
  return text.split("\n");
}

export function main(text: string, isPart2: boolean) {
  const map = preprocess(text);
  if (isPart2) {
    return partTwo(map);
  }
  return partOne(map);
}

export { partOne, partTwo };
