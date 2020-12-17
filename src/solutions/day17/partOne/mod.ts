import { Boundaries, Coordinate, State } from "../types.d.ts";
import {
  CellState,
  coordinateToKey,
  cubeCells,
  keyToCoordinate,
} from "../utils.ts";

function getBoundaries(state: State): Boundaries {
  const { xs, ys, zs } = Array.from(state.keys())
    .map((key) => keyToCoordinate(key))
    .reduce((acc, { x, y, z }) => {
      acc.xs.push(x);
      acc.ys.push(y);
      acc.zs.push(z);
      return acc;
    }, { xs: [] as number[], ys: [] as number[], zs: [] as number[] });
  const xBoundaries = { start: Math.min(...xs), end: Math.max(...xs) };
  const yBoundaries = { start: Math.min(...ys), end: Math.max(...ys) };
  const zBoundaries = { start: Math.min(...zs), end: Math.max(...zs) };
  return { x: xBoundaries, y: yBoundaries, z: zBoundaries };
}

function getNeighbors({ x, y, z }: Coordinate, state: State): string[] {
  const neighbors: string[] = [];
  const baseRange = { start: 0, end: 0 };
  const neighborCells = cubeCells(
    { x: baseRange, y: baseRange, z: baseRange },
    { x: 1, y: 1, z: 1 },
  );
  for (const { x: dx, y: dy, z: dz } of neighborCells) {
    if (![dx, dy, dz].every((d) => d === 0)) {
      const neighbor = { x: x + dx, y: y + dy, z: z + dz, w: 0 };
      neighbors.push(state.get(coordinateToKey(neighbor)) || ".");
    }
  }
  return neighbors;
}

function nextState({ x, y, z }: Coordinate, state: State): string {
  const neighbors = getNeighbors({ x, y, z, w: 0 }, state);
  const cellState = state.get(coordinateToKey({ x, y, z, w: 0 }));
  const actives = neighbors.filter((n) => n === CellState.ACTIVE).length;
  if (cellState === CellState.ACTIVE) {
    return [2, 3].includes(actives) ? CellState.ACTIVE : CellState.INACTIVE;
  }
  // cellState === CellState.INACTIVE
  return actives === 3 ? CellState.ACTIVE : CellState.INACTIVE;
}

export function partOne(
  input: State,
) {
  let current = new Map<string, string>(input.entries());
  let next = new Map<string, string>();
  for (let iter = 0; iter <= 6; iter++) {
    next.clear();
    const boundaries = getBoundaries(current);
    const cells = cubeCells(boundaries, { x: 1, y: 1, z: 1, w: 1 });
    for (const { x, y, z, w } of cells) {
      const coordinate = { x, y, z, w: 0 };
      const state = nextState(coordinate, current);
      if (state === CellState.ACTIVE) {
        next.set(coordinateToKey(coordinate), state);
      }
    }
    const temp = current;
    current = next;
    next = temp;
  }
  return Array.from(next.values())
    .filter((cell) => cell === CellState.ACTIVE).length;
}
