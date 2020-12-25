import { Point } from "../types.d.ts";

export function getKey(x: number, y: number) {
  return `${x};${y}`;
}

export function paintCell(movements: string, map: Set<string>) {
  const tokens = [...movements].values();
  let x: number, y: number;
  x = y = 0;
  let currentToken: IteratorResult<string, any>;

  do {
    currentToken = tokens.next();
    let movement = currentToken.value;
    if ("ns".includes(movement)) {
      currentToken = tokens.next();
      movement += currentToken.value;
    }
    ({ x, y } = move(movement, { x, y }));
  } while (!currentToken.done);
  toggleCell(map, { x, y });
}

export function move(movement: string, { x, y }: Point): Point {
  switch (movement) {
    case "e":
      x += 2;
      break;
    case "w":
      x -= 2;
      break;
    case "ne":
      y--;
      x++;
      break;
    case "nw":
      y--;
      x--;
      break;
    case "se":
      y++;
      x++;
      break;
    case "sw":
      y++;
      x--;
      break;
  }
  return { x, y };
}

export function toggleCell(map: Set<string>, { x, y }: Point) {
  if (map.has(getKey(x, y))) {
    map.delete(getKey(x, y));
  } else {
    map.add(getKey(x, y));
  }
}

export function paintCells(cells: string[]) {
  const map = new Set<string>();
  for (const cell of cells) {
    paintCell(cell, map);
  }
  return map;
}

export function partOne(cells: string[]) {
  const map = paintCells(cells);
  return map.size;
}
