import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import { applyMask, bitToNumbers } from "./mod.ts";

Deno.test("Day 14 - part 2 - bit mask apply", () => {
  let expected = "000000000000000000000000000000X1101X";
  let actual = applyMask(
    "000000000000000000000000000000101010",
    "000000000000000000000000000000X1001X",
  );
  assertEquals(actual, expected);

  expected = "00000000000000000000000000000001X0XX";
  actual = applyMask(
    "000000000000000000000000000000011010",
    "00000000000000000000000000000000X0XX",
  );
  assertEquals(actual, expected);
});

Deno.test("Day 14 - part 2 - floating values", () => {
  let expected = [
    "000000000000000000000000000000011010", // (decimal 26)
    "000000000000000000000000000000011011", // (decimal 27)
    "000000000000000000000000000000111010", // (decimal 58)
    "000000000000000000000000000000111011", // (decimal 59)
  ];
  let actual = bitToNumbers("000000000000000000000000000000X1101X");
  assertArrayIncludes(actual, expected);

  expected = [
    "000000000000000000000000000000010000", // (decimal 16)
    "000000000000000000000000000000010001", // (decimal 17)
    "000000000000000000000000000000010010", // (decimal 18)
    "000000000000000000000000000000010011", // (decimal 19)
    "000000000000000000000000000000011000", // (decimal 24)
    "000000000000000000000000000000011001", // (decimal 25)
    "000000000000000000000000000000011010", // (decimal 26)
    "000000000000000000000000000000011011", // (decimal 27)
  ];
  actual = bitToNumbers("00000000000000000000000000000001X0XX");
  assertArrayIncludes(actual, expected);
});
