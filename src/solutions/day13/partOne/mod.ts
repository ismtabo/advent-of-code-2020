import { Input } from "../types.d.ts";

export function nextBusArrival(timestamp: number, bus: number) {
  const lastTimestampDiff = timestamp % bus;
  const nextTimestampDiff = (bus - lastTimestampDiff);
  return timestamp + nextTimestampDiff;
}

export function partOne(input: Input) {
  const { bus, nextTimestamp } = input.buses.filter((bus) => !isNaN(bus)).map(
    (bus) => {
      return { bus, nextTimestamp: nextBusArrival(input.timestamp, bus) };
    },
  ).reduce((acc, val) => {
    if (val.nextTimestamp < acc.nextTimestamp) {
      return val;
    }
    return acc;
  }, { bus: NaN, nextTimestamp: Infinity });
  return (nextTimestamp - input.timestamp) * bus;
}
