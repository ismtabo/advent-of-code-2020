import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { evalOperation } from "./mod.ts";

Deno.test("Day 18 - part 1 - test operations", () => {
  assertEquals(evalOperation("1 + 2 * 3 + 4 * 5 + 6"), 71);
  assertEquals(evalOperation("1 + (2 * 3) + (4 * (5 + 6))"), 51);
  assertEquals(evalOperation("2 * 3 + (4 * 5)"), 26);
  assertEquals(evalOperation("5 + (8 * 3 + 9 + 3 * 4 * 3)"), 437);
  assertEquals(
    evalOperation("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"),
    12240,
  );
  assertEquals(
    evalOperation("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"),
    13632,
  );
});
