import { gameGenerator } from "../partOne/mod.ts";

export function partTwo(input: number[]) {
  let number = NaN;
  const game = gameGenerator(input);
  for (let turns = 0; turns < 30000000; turns++) {
    number = game.next().value;
  }
  return number;
}
