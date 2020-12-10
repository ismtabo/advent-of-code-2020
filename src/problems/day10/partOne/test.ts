import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { partOne } from "./mod.ts";

Deno.test("Day 10 - partOne - Ratings differences sample", () => {
  const text = Deno.readTextFileSync(`src/problems/day10/sample.txt`);
  const ratings = text.split("\n").map((line) => line.trim()).filter((line) =>
    line.length > 0
  ).map((line) => +line);
  assertEquals(partOne(ratings), 35);
});

Deno.test("Day 10 - partOne - Ratings differences sample", () => {
  const text = Deno.readTextFileSync(`src/problems/day10/sample_1.txt`);
  const ratings = text.split("\n").map((line) => line.trim()).filter((line) =>
    line.length > 0
  ).map((line) => +line);
  assertEquals(partOne(ratings), 220);
});
