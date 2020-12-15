import { BitMask, Input } from "../types.d.ts";
import { isBitMask, toBinary } from "../utils.ts";

function bitToNumber(value: string) {
  return [...value].reverse().reduce(
    (acc, val, index) => acc + (+val) * Math.pow(2, index),
    0,
  );
}

function applyMask(value: string, bitMask: BitMask) {
  value = [...value]
    .map((val, i) => bitMask[i] === "1" ? "1" : bitMask[i] === "0" ? "0" : val)
    .join("");
  return value;
}

export function partOne(input: Input) {
  const memory: string[] = new Array(36);
  let currentBitMask: BitMask;
  input.operations.forEach((operation) => {
    if (isBitMask(operation)) {
      currentBitMask = operation;
    } else {
      const bitValue = toBinary(operation.value);
      const value = applyMask(bitValue, currentBitMask);
      memory[operation.address] = value;
    }
  });
  return memory.map(bitToNumber).reduce((a, b) => a + b);
}
