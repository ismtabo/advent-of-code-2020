export function isValidNumber(
  preamble: number[],
  number: number,
) {
  return preamble.some((aNumber) =>
    preamble.some((otherNumber) =>
      aNumber !== otherNumber && aNumber + otherNumber === number
    )
  );
}

export function partOne(
  numbers: number[],
  options: { preamble: number } = { preamble: 25 },
): number {
  return numbers.slice(options.preamble).find((number, index) =>
    !isValidNumber(
      numbers.slice(index, index + options.preamble),
      number,
    )
  ) || NaN;
}
