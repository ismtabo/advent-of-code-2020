function getPosition(
  map: string[],
  rowIndex: number,
  columnIndex: number,
): string {
  const row = map[rowIndex];
  return row[columnIndex % row.length];
}

export function partOne(map: string[], { dRows = 1, dColumns = 3 } = {}) {
  let row = 0, column = 0;
  let count = 0;
  while (row < map.length) {
    const cell = getPosition(map, row, column);
    if (cell === "#") {
      count++;
    }
    row += dRows;
    column += dColumns;
  }
  return count;
}
