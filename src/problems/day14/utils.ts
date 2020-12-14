import { BitMask, MemOperation } from "./types.d.ts";

export function isBitMask(
  obj: MemOperation | BitMask,
): obj is BitMask {
  return typeof obj === "string";
}

export function toBinary(value: number | bigint) {
  let bit = (typeof value === "number" ? value >> 0 : value >> 0n).toString(
    2,
  );
  if (bit.length < 36) {
    const fillZeros = "0".repeat(36 - bit.length);
    bit = fillZeros + bit;
  }
  return bit;
}
