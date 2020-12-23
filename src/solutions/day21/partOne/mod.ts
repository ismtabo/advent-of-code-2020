import { Ingredient } from "../types.d.ts";

export function getAllergensByTranslationsEntries(
  ingredients: Ingredient[],
): Array<[string, Set<string>]> {
  const translations = new Set(
    ingredients.flatMap(({ translations }) => translations),
  );
  return Array.from(translations)
    .map((translation) => {
      const allergensByTranslation = ingredients
        .filter(({ translations }) => translations.includes(translation))
        .map(({ allergens }) => new Set(allergens))
        .reduce((acc, value) =>
          new Set(Array.from(acc).filter((allergen) => value.has(allergen)))
        );
      return [translation, allergensByTranslation];
    });
}

export function getAllergensWithOutTranslation(ingredients: Ingredient[]) {
  const allergens = new Set(
    ingredients.flatMap(({ allergens }) => allergens),
  );
  const allergensByTranslations = getAllergensByTranslationsEntries(ingredients)
    .map(([_, allergens]) => allergens);
  return Array.from(allergens)
    .filter((allergen) =>
      !allergensByTranslations.some((allergensByTranslation) =>
        allergensByTranslation.has(allergen)
      )
    );
}

export function partOne(ingredients: Ingredient[]) {
  return getAllergensWithOutTranslation(ingredients)
    .map((allergen) =>
      ingredients.filter(({ allergens }) => allergens.includes(allergen)).length
    )
    .reduce((acc, value) => acc + value);
}
