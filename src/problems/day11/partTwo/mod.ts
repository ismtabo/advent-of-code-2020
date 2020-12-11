import { NEIGHBORS_DIRECTIONS, partOne } from "../partOne/mod.ts";

export function getNeighborRayCast(
  map: string[][],
  row: number,
  col: number,
): string[] {
  return NEIGHBORS_DIRECTIONS.map(
    ([dRow, dCol]) => {
      let cell;
      let currentRow = row;
      let currentCol = col;
      do {
        currentRow += dRow;
        currentCol += dCol;
        cell = (map[currentRow] || [])[currentCol];
      } while (cell === ".");
      return cell;
    },
  ).filter((neighbor) => ["#", "L"].includes(neighbor));
}

export function partTwo(map: string[][]) {
  return partOne(
    map,
    { getNeighborFn: getNeighborRayCast, minOccupiedNeighborSeats: 5 },
  );
}
