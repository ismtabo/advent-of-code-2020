import { dirname, join } from "https://deno.land/std/path/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { partOne } from "./mod.ts";

const __dirname = dirname(new URL(import.meta.url).pathname);

Deno.test("Day 10 - partOne - Ratings differences sample", () => {
  const text = Deno.readTextFileSync(join(__dirname, `../sample.txt`));
  const ratings = text.split("\n").map((line) => line.trim()).filter((line) =>
    line.length > 0
  ).map((line) => +line);
  assertEquals(partOne(ratings), 35);
});

Deno.test("Day 10 - partOne - Ratings differences sample 1", () => {
  const text = Deno.readTextFileSync(join(__dirname, `../sample_1.txt`));
  const ratings = text.split("\n").map((line) => line.trim()).filter((line) =>
    line.length > 0
  ).map((line) => +line);
  assertEquals(partOne(ratings), 220);
});
