import { NEIGHBORS_DIRECTIONS } from "../utils.ts";
import { GenerateNewStateOptions, PartOneOptions } from "./types.d.ts";

function getNeighbors(map: string[][], row: number, col: number) {
  return NEIGHBORS_DIRECTIONS.map(([dRow, dCol]) =>
    (map[row + dRow] || [])[col + dCol]
  )
    .filter(
      (neighbor) => ["#", "L"].includes(neighbor),
    );
}

function generateNewState(
  map: string[][],
  cell: string,
  row: number,
  col: number,
  {
    getNeighborFn = getNeighbors,
    minOccupiedNeighborSeats = 4,
  }: GenerateNewStateOptions,
) {
  if (cell === "L") {
    const emptyNeighbors = getNeighborFn(map, row, col).every((other) =>
      other === "L"
    );
    return emptyNeighbors ? "#" : "L";
  }
  if (cell === "#") {
    const occupiedNeighbors = getNeighborFn(map, row, col).filter((other) =>
      other === "#"
    ).length >= minOccupiedNeighborSeats;
    return occupiedNeighbors ? "L" : "#";
  }
  return cell;
}

function mapToString(
  map: string[][],
) {
  return map.flatMap((row) => row.join("")).join("\n");
}

export function partOne(map: string[][], options: PartOneOptions = {
  getNeighborFn: getNeighbors,
  minOccupiedNeighborSeats: 4,
}) {
  const visitedStates = new Set<string>();
  let previousState: string[][], newState: string[][];
  previousState = newState = map;
  do {
    previousState = newState;
    visitedStates.add(mapToString(previousState));
    newState = previousState.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        generateNewState(previousState, cell, rowIndex, colIndex, options)
      )
    );
  } while (!visitedStates.has(mapToString(newState)));
  return previousState.flatMap((row) => row).filter((char) => char === "#")
    .length;
}
