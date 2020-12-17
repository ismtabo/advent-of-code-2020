import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { State } from "./types.d.ts";
import { CellState, coordinateToKey } from "./utils.ts";

export function preprocess(text: string): State {
  const entries = text
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line, y) =>
      [...line]
        .map((cell, x) => ({ cell, x, y }))
        .filter(({ cell }) => cell === CellState.ACTIVE)
    )
    .flatMap((rows) => rows)
    .map<[string, string]>((
      { x, y, cell },
    ) => [coordinateToKey({ x, y, z: 0, w: 0 }), cell])
    .reduce((acc, val) => {
      acc.push(val);
      return acc;
    }, new Array<[string, string]>());
  return new Map<string, string>(entries);
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
