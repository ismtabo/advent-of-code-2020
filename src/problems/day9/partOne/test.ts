import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { isValidNumber, partOne } from "./index.ts";

Deno.test("Day 9 - part 1 - test isValidNumber range 1 to 25", () => {
  const preamble = [...new Array(26).keys()].slice(1); // 1..25
  assertEquals(
    isValidNumber(preamble, 26),
    true,
    "Error - result does not match for number " + 26,
  );
  assertEquals(
    isValidNumber(preamble, 49),
    true,
    "Error - result does not match for number " + 49,
  );
  assertEquals(
    isValidNumber(preamble, 100),
    false,
    "Error - result does not match for number " + 100,
  );
  assertEquals(
    isValidNumber(preamble, 50),
    false,
    "Error - result does not match for number " + 50,
  );
});

Deno.test("Day 9 - part 1 - test isValidNumber ranges 1 to 19, 21 to 25", () => {
  const numberRange = [...new Array(26).keys()];
  const firstRange = numberRange.slice(1, 20); // 1..19
  const secondRange = numberRange.slice(21); // 1..25
  const preamble = firstRange.concat(secondRange).concat(45);
  assertEquals(
    isValidNumber(preamble, 26),
    true,
    "Error - result does not match for number " + 26,
  );
  assertEquals(
    isValidNumber(preamble, 65),
    false,
    "Error - result does not match for number " + 65,
  );
  assertEquals(
    isValidNumber(preamble, 64),
    true,
    "Error - result does not match for number " + 64,
  );
  assertEquals(
    isValidNumber(preamble, 66),
    true,
    "Error - result does not match for number " + 66,
  );
});

Deno.test("Day 9 - part 1 - sample input", () => {
  const text = Deno.readTextFileSync("src/problems/day9/sample.txt");
  const numbers = text.split("\n").map((line) => line.trim()).filter((line) =>
    line.length > 0
  ).map((line) => +line);
  assertEquals(partOne(numbers, { preamble: 5 }), 127);
});
