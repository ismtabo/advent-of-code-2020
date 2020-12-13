import { Case } from "../types.d.ts";
import { chineseRemainder } from "./utils.ts";

export function findMinTimestamp(buses: number[]) {
  const firstBus = buses[0];
  let currentTimestamp = 0;
  while (
    !buses.every((bus, index) =>
      isNaN(bus) || ((currentTimestamp + index) % bus === 0)
    )
  ) {
    currentTimestamp += firstBus;
  }
  return currentTimestamp;
}

export function partTwo(input: Case) {
  return chineseRemainder(input.buses);
}
