import { partOne } from "../partOne/index.ts";

export function partTwo(map: string[]) {
  const slopes = [
    { dColumns: 1, dRows: 1 },
    { dColumns: 3, dRows: 1 },
    { dColumns: 5, dRows: 1 },
    { dColumns: 7, dRows: 1 },
    { dColumns: 1, dRows: 2 },
  ];
  return slopes.map((slope) => partOne(map, slope)).reduce(
    (acc, val) => acc * val,
    1,
  );
}
