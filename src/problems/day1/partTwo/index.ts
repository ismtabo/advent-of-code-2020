export function partTwo(numbers: number[]): number {
  const rightNumbers = numbers.map((number) =>
    numbers.map((other) =>
      numbers.filter((another) => number + other + another === 2020)
    )
  );
  const realRightNumbers = new Set(
    rightNumbers.flatMap((numbers) => numbers.flatMap((nested) => nested)),
  );
  return [...realRightNumbers].reduce((acc, number) => acc * number, 1);
}
