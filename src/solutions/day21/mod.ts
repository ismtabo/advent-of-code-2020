import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Ingredient } from "./types.d.ts";

export function preprocess(text: string): Ingredient[] {
  const lines = text.split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const ingredientList = lines.map((line) => {
    const match = line.match(
      /(?<allergens>(\w+\s+)+)\(contains (?<translations>[^)]+)\)/,
    );
    const { allergens: allergensList, translations: translationsList } = match!
      .groups!;
    const allergens = allergensList.trim().split(" ");
    const translations = translationsList.trim().split(", ");
    return { allergens, translations };
  });
  return ingredientList;
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
