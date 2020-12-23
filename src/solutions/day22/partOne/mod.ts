import { Decks } from "../types.d.ts";

export function partOne({ playerOne, playerTwo }: Decks) {
  playerOne = playerOne.slice();
  playerTwo = playerTwo.slice();
  while (playerOne.length > 0 && playerTwo.length > 0) {
    const playerOnePlay = playerOne.shift()!;
    const playerTwoPlay = playerTwo.shift()!;
    if (playerOnePlay > playerTwoPlay) {
      playerOne.push(playerOnePlay, playerTwoPlay);
    } else {
      playerTwo.push(playerTwoPlay, playerOnePlay);
    }
  }
  const winnerDeck = playerOne.length > 0 ? playerOne : playerTwo;
  return winnerDeck.slice().reverse().reduce(
    (acc, val, index) => acc + val * (index + 1),
    0,
  );
}
