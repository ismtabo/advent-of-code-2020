import { getKey, move, paintCells } from "../partOne/mod.ts";
import { Point } from "../types.d.ts";

function parseKey(key: string): Point {
  const [x, y] = key.trim().split(";", 2);
  return { x: +x, y: +y };
}

function getNeighbors(cell: string) {
  const point = parseKey(cell);
  return ["e", "ne", "nw", "w", "sw", "se"].map((movement) =>
    move(movement, point)
  ).map(({ x, y }) => getKey(x, y));
}

function nextState(
  previousMap: Set<string>,
  nextMap: Set<string>,
  cell: string,
) {
  const neighbors = getNeighbors(cell);
  const blackNeighbors =
    neighbors.filter((cell) => previousMap.has(cell)).length;
  if (previousMap.has(cell)) {
    if (!(blackNeighbors === 0 || blackNeighbors > 2)) {
      nextMap.add(cell);
    }
  } else {
    if (blackNeighbors === 2) {
      nextMap.add(cell);
    }
  }
}

export function day(map: Set<string>) {
  const blackCells = Array.from(map);
  const nextMap = new Set<string>();

  const activeCells = new Set(blackCells.concat(
    ...blackCells.map((cell) => getNeighbors(cell)),
  ));

  for (const cell of activeCells) {
    nextState(map, nextMap, cell);
  }

  return nextMap;
}

export function partTwo(cells: string[]) {
  let map = paintCells(cells);
  let days = 100;
  while (days-- > 0) {
    map = day(map);
  }
  return map.size;
}
