import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { partTwo } from "./mod.ts";

Deno.test("Day 9 - part 2 - sample input", () => {
  const text = Deno.readTextFileSync("src/problems/day9/sample.txt");
  const numbers = text.split("\n").map((line) => line.trim()).filter((line) =>
    line.length > 0
  ).map((line) => +line);
  assertEquals(partTwo(numbers, { preamble: 5 }), 62);
});
