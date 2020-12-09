import { partOne } from "../partOne/index.ts";

export function partTwo(
  numbers: number[],
  options: { preamble: number } = { preamble: 25 },
) {
  const numberToGues = partOne(numbers, options);
  let startIndex, endIndex;
  startIndex = 0, endIndex = startIndex + 1;
  while (startIndex < endIndex && endIndex < numbers.length) {
    const rangeSum = numbers.slice(startIndex, endIndex + 1).reduce(
      (acc, val) => acc + val,
      0,
    );
    if (rangeSum < numberToGues) {
      endIndex++;
    } else if (rangeSum > numberToGues) {
      startIndex++;
      endIndex = startIndex + 1;
    } else {
      break;
    }
  }
  const range = numbers.slice(startIndex, endIndex + 1);
  const min = Math.min(...range);
  const max = Math.max(...range);
  return min + max;
}
