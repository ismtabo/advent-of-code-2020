import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { evalOperation } from "./mod.ts";

Deno.test("Day 18 - part 2 - test operations", () => {
  assertEquals(evalOperation("1 + 2 * 3 + 4 * 5 + 6"), 231);
  assertEquals(evalOperation("1 + (2 * 3) + (4 * (5 + 6))"), 51);
  assertEquals(evalOperation("2 * 3 + (4 * 5)"), 46);
  assertEquals(evalOperation("5 + (8 * 3 + 9 + 3 * 4 * 3)"), 1445);
  assertEquals(
    evalOperation("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"),
    669060,
  );
  assertEquals(
    evalOperation("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"),
    23340,
  );
});
