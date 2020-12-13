import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function main(text: string, isPart2: boolean) {
  const [timestampLine, busesLine] = text.split("\n");
  const timestamp = +timestampLine.trim();
  const buses = busesLine.split(",").map((bus) => bus.trim()).map((bus) =>
    +bus
  );
  if (isPart2) {
    return partTwo({ timestamp, buses });
  }
  return partOne({ timestamp, buses });
}

export { partOne, partTwo };
