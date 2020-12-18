import { generateSeatId } from "../partOne/mod.ts";

export function partTwo(instructionsSet: string[]) {
  const seats = instructionsSet.map(generateSeatId).map(({ seatId }) => seatId)
    .slice().sort((a, b) => a - b);
  const missingSeat = seats.find((seat, i) => seats[i + 1] === seat + 2);
  return missingSeat != null ? missingSeat + 1 : NaN;
}
