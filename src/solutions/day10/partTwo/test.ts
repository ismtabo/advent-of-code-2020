import { dirname, join } from "https://deno.land/std/path/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { preprocess } from "../mod.ts";
import { partTwo } from "./mod.ts";

const __dirname = dirname(new URL(import.meta.url).pathname);

Deno.test("Day 10 - partTwo - Combinations sample", () => {
  const text = Deno.readTextFileSync(join(__dirname, `../sample.txt`));
  const ratings = preprocess(text);
  assertEquals(partTwo(ratings), 8);
});

Deno.test("Day 10 - partTwo - Combinations sample 1", () => {
  const text = Deno.readTextFileSync(join(__dirname, `../sample_1.txt`));
  const ratings = preprocess(text);
  assertEquals(partTwo(ratings), 19208);
});
