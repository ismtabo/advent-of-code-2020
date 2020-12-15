export function* gameGenerator(
  initial: number[],
): Generator<number, number, number> {
  const alreadySaid = new Map<number, number>();
  let last: number = NaN;
  let turn = 0;
  for (let i = 0; i < initial.length; i++) {
    const number = initial[i];
    alreadySaid.set(last, turn++);
    last = number;
    yield number;
  }
  while (true) {
    let number: number;
    if (!alreadySaid.has(last)) {
      number = 0;
    } else {
      number = turn - (alreadySaid.get(last) || NaN);
    }
    alreadySaid.set(last, turn++);
    yield number;
    last = number;
  }
}

export function partOne(input: number[]) {
  let number = NaN;
  const game = gameGenerator(input);
  for (let turns = 0; turns < 2020; turns++) {
    number = game.next().value;
  }
  return number;
}
