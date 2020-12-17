import { Boundaries, Coordinate, Margin, MetaBoundaries } from "./types.d.ts";

export enum CellState {
  ACTIVE = "#",
  INACTIVE = ".",
}

export function coordinateToKey({ x, y, z, w = 0 }: Coordinate) {
  return [x, y, z, w].join(";");
}

export function keyToCoordinate(key: string): Coordinate {
  const [x, y, z, w = 0] = key.split(";");
  return { x: +x, y: +y, z: +z, w: +w };
}

const defaultMargin: Margin = { x: 0, y: 0, z: 0, w: 0 };

export function cubeCells(
  boundaries: Boundaries,
  margin: Margin = defaultMargin,
) {
  return hyperCubeCells(
    { ...boundaries, w: { start: 0, end: 0 } },
    { ...margin, w: 0 },
  );
}

export function* hyperCubeCells(
  boundaries: MetaBoundaries,
  margin: Margin = defaultMargin,
): Generator<Coordinate> {
  let x = boundaries.x.start - margin.x;
  let y = boundaries.y.start - margin.y;
  let z = boundaries.z.start - margin.z;
  let w = boundaries.w.start - margin.w!;

  while (true) {
    yield { x, y, z, w };
    x++;
    if (x > boundaries.x.end + margin.x) {
      y++;
      x = boundaries.x.start - 1;
    }
    if (y > boundaries.y.end + margin.y) {
      z++;
      y = boundaries.y.start - 1;
    }
    if (z > boundaries.z.end + margin.z) {
      w++;
      z = boundaries.z.start - 1;
    }
    if (w > boundaries.w.end + margin.w!) {
      return { x, y, z, w };
    }
  }
}
