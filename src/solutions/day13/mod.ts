import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Input } from "./types.d.ts";

export function preprocess(text: string): Input {
  const [timestampLine, busesLine] = text.split("\n");
  const timestamp = +timestampLine.trim();
  const buses = busesLine.split(",").map((bus) => bus.trim()).map(Number);
  return { timestamp, buses };
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
