import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { generateSeatId } from "./mod.ts";

Deno.test("Day 5 - seat identifier test", () => {
  const cases = [
    { instructions: "BFFFBBFRRR", row: 70, column: 7, seatId: 567 },
    { instructions: "FFFBBBFRRR", row: 14, column: 7, seatId: 119 },
    { instructions: "BBFFBBFRLL", row: 102, column: 4, seatId: 820 },
  ];
  for (const { instructions, row, column, seatId: expectedSeatId } of cases) {
    const result = generateSeatId(instructions);
    assertEquals(
      expectedSeatId,
      result.seatId,
      `Error: seatId does not match for instructions: ${instructions}\n\t${
        JSON.stringify({
          row,
          column,
          expectedSeatId,
        })
      }\n\t${JSON.stringify(result)}`,
    );
  }
});
