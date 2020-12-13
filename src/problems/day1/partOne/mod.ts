export function partOne(numbers: number[]) {
  const rightNumbers = numbers.map((number) =>
    numbers.filter((other) => number + other === 2020)
  );
  const realRightNumbers = new Set(
    rightNumbers.flatMap((numbers) => numbers),
  );
  return [...realRightNumbers].reduce((acc, number) => acc * number, 1);
}
