import { Coordinate, MetaBoundaries, State } from "../types.d.ts";
import {
  CellState,
  coordinateToKey,
  hyperCubeCells,
  keyToCoordinate,
} from "../utils.ts";

function getMetaBoundaries(state: State): MetaBoundaries {
  const { xs, ys, zs, ws } = Array.from(state.keys())
    .map((key) => keyToCoordinate(key))
    .reduce(
      (acc, { x, y, z, w }) => {
        acc.xs.push(x);
        acc.ys.push(y);
        acc.zs.push(z);
        acc.ws.push(w!);
        return acc;
      },
      {
        xs: [] as number[],
        ys: [] as number[],
        zs: [] as number[],
        ws: [] as number[],
      },
    );
  const xBoundaries = { start: Math.min(...xs), end: Math.max(...xs) };
  const yBoundaries = { start: Math.min(...ys), end: Math.max(...ys) };
  const zBoundaries = { start: Math.min(...zs), end: Math.max(...zs) };
  const wBoundaries = { start: Math.min(...ws), end: Math.max(...ws) };
  return { x: xBoundaries, y: yBoundaries, z: zBoundaries, w: wBoundaries };
}

function getMetaNeighbors(
  { x, y, z, w }: Coordinate,
  state: State,
): string[] {
  const neighbors: string[] = [];
  const baseRange = { start: 0, end: 0 };
  const neighborCells = hyperCubeCells(
    { x: baseRange, y: baseRange, z: baseRange, w: baseRange },
    { x: 1, y: 1, z: 1, w: 1 },
  );
  for (const { x: dx, y: dy, z: dz, w: dw } of neighborCells) {
    if (![dx, dy, dz, dw].every((d) => d === 0)) {
      const neighbor = { x: x + dx, y: y + dy, z: z + dz, w: w! + dw! };
      neighbors.push(
        state.get(coordinateToKey(neighbor)) || CellState.INACTIVE,
      );
    }
  }
  return neighbors;
}

function nextState({ x, y, z, w }: Coordinate, state: State): string {
  const neighbors = getMetaNeighbors({ x, y, z, w }, state);
  const cellState = state.get(coordinateToKey({ x, y, z, w }));
  const actives = neighbors.filter((n) => n === CellState.ACTIVE).length;
  if (cellState === CellState.ACTIVE) {
    return [2, 3].includes(actives) ? CellState.ACTIVE : CellState.INACTIVE;
  }
  // cellState === CellState.INACTIVE
  return actives === 3 ? CellState.ACTIVE : CellState.INACTIVE;
}

export function partTwo(
  input: State,
) {
  let current = new Map<string, string>(input.entries());
  let next = new Map<string, string>();
  for (let iter = 0; iter <= 6; iter++) {
    next.clear();
    const boundaries = getMetaBoundaries(current);
    const cells = hyperCubeCells(boundaries, { x: 1, y: 1, z: 1, w: 1 });
    for (const { x, y, z, w } of cells) {
      const state = nextState({ x, y, z, w }, current);
      if (state === CellState.ACTIVE) {
        next.set(coordinateToKey({ x, y, z, w }), state);
      }
    }
    const temp = current;
    current = next;
    next = temp;
  }
  return Array.from(next.values())
    .filter((cell) => cell === CellState.ACTIVE).length;
}
