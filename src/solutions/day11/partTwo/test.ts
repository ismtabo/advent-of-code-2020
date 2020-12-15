import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import { getNeighborRayCast } from "./mod.ts";

Deno.test("Day 11 - part 2 - neighbor ray cast", () => {
  const map = `\
.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`.split("\n").map((line) => [...line]);

  assertArrayIncludes(getNeighborRayCast(map, 4, 3), new Array(8).fill("#"));
});

Deno.test("Day 11 - part 2 - neighbor ray cast can not see occupied", () => {
  const map = `\
.............
.L.L.#.#.#.#.
.............`.split("\n").map((line) => [...line]);

  assertEquals(getNeighborRayCast(map, 1, 1), ["L"]);
});

Deno.test("Day 11 - part 2 - neighbor ray cast empty neighbors", () => {
  const map = `\
.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.`.split("\n").map((line) => [...line]);

  assertEquals(getNeighborRayCast(map, 3, 3), []);
});
