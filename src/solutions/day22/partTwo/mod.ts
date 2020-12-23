import { Decks, Winner } from "../types.d.ts";

function game({ playerOne, playerTwo }: Decks, gameNumber = 1): Winner {
  playerOne = playerOne.slice();
  playerTwo = playerTwo.slice();
  const previousRounds = new Set<string>();
  let roundNumber = 1;
  while (playerOne.length > 0 && playerTwo.length > 0) {
    const round = JSON.stringify({ playerOne, playerTwo });
    if (previousRounds.has(round)) {
      return { winner: 1, deck: playerOne };
    } else {
      previousRounds.add(round);
    }

    const playerOnePlay = playerOne.shift()!;
    const playerTwoPlay = playerTwo.shift()!;

    let isPlayerOneWinner;
    if (
      playerOnePlay <= playerOne.length && playerTwoPlay <= playerTwo.length
    ) {
      const { winner: subGameWinner } = game(
        {
          playerOne: playerOne.slice(0, playerOnePlay),
          playerTwo: playerTwo.slice(0, playerTwoPlay),
        },
        gameNumber + 1,
      );
      isPlayerOneWinner = subGameWinner === 1;
    } else {
      isPlayerOneWinner = playerOnePlay > playerTwoPlay;
    }

    if (isPlayerOneWinner) {
      playerOne.push(playerOnePlay, playerTwoPlay);
    } else {
      playerTwo.push(playerTwoPlay, playerOnePlay);
    }
    roundNumber++;
  }
  const winner = playerOne.length > 0 ? 1 : 2;
  const deck = playerOne.length > 0 ? playerOne : playerTwo;
  return { winner, deck };
}

export function partTwo(decks: Decks) {
  const { deck: winnerDeck } = game(decks);
  return winnerDeck.slice().reverse().reduce(
    (acc, val, index) => acc + val * (index + 1),
    0,
  );
}
