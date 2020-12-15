import { BitMask, Input } from "../types.d.ts";
import { isBitMask as isBitMask, toBinary } from "../utils.ts";

export function bitToNumber(value: string) {
  return [...value].reverse().reduce(
    (acc, val, index) => acc + (+val) * Math.pow(2, index),
    0,
  );
}

export function bitToNumbers(value: string) {
  const openValues = [value];
  const possibleValues = [];
  let currentValue;
  // deno-lint-ignore no-cond-assign
  while (currentValue = openValues.shift()) {
    const findX = currentValue.indexOf("X");
    if (findX !== -1) {
      const zeroValue = currentValue.slice(0, findX).concat("0").concat(
        currentValue.slice(findX + 1),
      );
      const oneValue = currentValue.slice(0, findX).concat("1").concat(
        currentValue.slice(findX + 1),
      );
      openValues.push(zeroValue, oneValue);
    } else {
      possibleValues.push(currentValue);
    }
  }
  return possibleValues;
}

export function applyMask(value: string, bitMask: BitMask) {
  value = [...value]
    .map((val, i) => bitMask[i] === "1" ? "1" : bitMask[i] === "X" ? "X" : val)
    .join("");
  return value;
}

export function partTwo(input: Input) {
  const memory: Map<number, number> = new Map();
  let currentBitMask: BitMask;
  input.operations.forEach((operation) => {
    if (isBitMask(operation)) {
      currentBitMask = operation;
    } else {
      const bitAddress = toBinary(operation.address);
      const address = applyMask(bitAddress, currentBitMask);
      const addresses = bitToNumbers(address).map(bitToNumber);
      for (const subAddress of addresses) {
        memory.set(subAddress, operation.value);
      }
    }
  });
  return [...memory.values()].reduce((a, b) => a + b);
}
