import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { gameGenerator, partOne } from "./mod.ts";

Deno.test("Day 15 - part 1 - generator test", () => {
  const game = gameGenerator([0, 3, 6]);
  assertEquals(game.next().value, 0);
  assertEquals(game.next().value, 3);
  assertEquals(game.next().value, 6);
  assertEquals(game.next().value, 0);
  assertEquals(game.next().value, 3);
  assertEquals(game.next().value, 3);
  assertEquals(game.next().value, 1);
  assertEquals(game.next().value, 0);
  assertEquals(game.next().value, 4);
  assertEquals(game.next().value, 0);
});

Deno.test("Day 15 - part 1 - results", () => {
  assertEquals(partOne([0, 3, 6]), 436);
  assertEquals(partOne([1, 3, 2]), 1);
  assertEquals(partOne([2, 1, 3]), 10);
  assertEquals(partOne([1, 2, 3]), 27);
  assertEquals(partOne([2, 3, 1]), 78);
  assertEquals(partOne([3, 2, 1]), 438);
  assertEquals(partOne([3, 1, 2]), 1836);
});
