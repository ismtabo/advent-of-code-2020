import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { partTwo } from "./mod.ts";

Deno.test("Day 10 - partTwo - Ratings differences sample", () => {
  const text = Deno.readTextFileSync(`src/problems/day10/sample.txt`);
  const ratings = text.split("\n").map((line) => line.trim()).filter((line) =>
    line.length > 0
  ).map((line) => +line);
  assertEquals(partTwo(ratings), 8);
});

Deno.test("Day 10 - partTwo - Ratings differences sample", () => {
  const text = Deno.readTextFileSync(`src/problems/day10/sample_1.txt`);
  const ratings = text.split("\n").map((line) => line.trim()).filter((line) =>
    line.length > 0
  ).map((line) => +line);
  assertEquals(partTwo(ratings), 19208);
});
