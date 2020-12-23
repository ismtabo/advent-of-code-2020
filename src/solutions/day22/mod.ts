import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Decks } from "./types.d.ts";

export function preprocess(text: string): Decks {
  const decksLines = text.split("\n\n", 2);
  const [playerOne, playerTwo] = decksLines.map((deckLines) =>
    deckLines.split("\n").slice(1).map((line) => line.trim()).filter((line) =>
      line.length > 0
    ).map((line) => +line)
  );
  return { playerOne, playerTwo };
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
