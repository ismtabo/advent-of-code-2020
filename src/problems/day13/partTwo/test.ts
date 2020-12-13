import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { calculate, chineseRemainder, findMinTimestamp } from "./utils.ts";

function preprocessInput(input: string): number[] {
  return input.split(",").map((number) => +number.trim());
}

Deno.test("Day 13 - part two", () => {
  assertEquals(findMinTimestamp(preprocessInput("17,x,13,19")), 3417);
  assertEquals(findMinTimestamp(preprocessInput("67,7,59,61")), 754018);
  assertEquals(findMinTimestamp(preprocessInput("67,x,7,59,61")), 779210);
  assertEquals(findMinTimestamp(preprocessInput("67,7,x,59,61")), 1261476);
  assertEquals(
    findMinTimestamp(preprocessInput("1789,37,47,1889")),
    1202161486,
  );
});

Deno.test("Day 13 - part two - other", () => {
  assertEquals(
    calculate(
      preprocessInput("17,x,13,19"),
    ),
    3417,
  );
  assertEquals(calculate(preprocessInput("67,7,59,61")), 754018);
  assertEquals(calculate(preprocessInput("67,x,7,59,61")), 779210);
  assertEquals(calculate(preprocessInput("67,7,x,59,61")), 1261476);
  assertEquals(
    calculate(preprocessInput("1789,37,47,1889")),
    1202161486,
  );
});

Deno.test("Day 13 - part two - chinese remainder", () => {
  assertEquals(
    chineseRemainder(
      preprocessInput("17,x,13,19"),
    ),
    3417n,
  );
  assertEquals(chineseRemainder(preprocessInput("67,7,59,61")), 754018n);
  assertEquals(chineseRemainder(preprocessInput("67,x,7,59,61")), 779210n);
  assertEquals(chineseRemainder(preprocessInput("67,7,x,59,61")), 1261476n);
  assertEquals(
    chineseRemainder(preprocessInput("1789,37,47,1889")),
    1202161486n,
  );
});
