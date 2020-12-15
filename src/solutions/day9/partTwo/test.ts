import { dirname, join } from "https://deno.land/std/path/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { partTwo } from "./mod.ts";

const __dirname = dirname(new URL(import.meta.url).pathname);

Deno.test("Day 9 - part 2 - sample input", () => {
  const text = Deno.readTextFileSync(join(__dirname, "../sample.txt"));
  const numbers = text.split("\n").map((line) => line.trim()).filter((line) =>
    line.length > 0
  ).map((line) => +line);
  assertEquals(partTwo(numbers, { preamble: 5 }), 62);
});
