import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { BitMask, Input, MemOperation } from "./types.d.ts";
import { toBinary } from "./utils.ts";

const RE_BITMASK = /mask\s=\s([X10]+)/;
const RE_MEM_OPERATION = /mem\[(\d+)\]\s=\s(\d+)/;

export function preprocess(text: string): Input {
  const operationsLines = text.split("\n").filter((line) =>
    line.trim().length > 0
  );
  const operations = operationsLines.map<BitMask | MemOperation>((line) => {
    if (RE_BITMASK.test(line)) {
      const mask = (line.match(RE_BITMASK) || [])[1] || "X".repeat(36);
      return mask;
    }
    const [_, position, value] = line.match(RE_MEM_OPERATION) || [];
    return {
      address: +position,
      value: +value,
    };
  });

  return { operations };
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
