export function generateSeatId(
  instructions: string,
): { row: number; col: number; seatId: number } {
  const row = instructions.slice(0, 7);
  const rowNumber = parseInt(row.replace(/F/g, "0").replace(/B/g, "1"), 2);
  const col = instructions.slice(7);
  const colNumber = parseInt(col.replace(/L/g, "0").replace(/R/g, "1"), 2);
  return { row: rowNumber, col: colNumber, seatId: rowNumber * 8 + colNumber };
}

export function partOne(instructionsSet: string[]) {
  return Math.max(
    ...instructionsSet.map(generateSeatId).map(({ seatId }) => seatId),
  );
}
