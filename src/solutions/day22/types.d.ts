type Deck = number[];

export interface Decks {
  playerOne: Deck;
  playerTwo: Deck;
}

export interface Winner {
  winner: 1 | 2;
  deck: Deck;
}

export type Round = (_: Decks, __: RoundWinCondition) => Decks;

export type RoundWinCondition = (
  playerOnePlay: number,
  playerTwoPlay: number,
  decks?: Decks,
) => boolean;
