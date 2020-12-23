import { getAllergensByTranslationsEntries } from "../partOne/mod.ts";
import { Ingredient } from "../types.d.ts";

export function partTwo(ingredients: Ingredient[]) {
  const allergensByTranslationMap = new Map<string, Set<string>>(
    getAllergensByTranslationsEntries(ingredients).sort((
      [_, allergensA],
      [__, allergensB],
    ) => allergensA.size - allergensB.size),
  );
  const allergensByTranslationQueue = Array.from(
    allergensByTranslationMap.entries(),
  );

  const allergensTranslations = new Map<string, string>();
  while (allergensByTranslationQueue.length > 0) {
    const [translation, allergens] = allergensByTranslationQueue.shift()!;
    if (allergens.size > 1) {
      allergensByTranslationQueue.push([translation, allergens]);
      continue;
    }
    const allergen = allergens.values().next()!.value;
    Array.from(
      allergensByTranslationMap.entries(),
    ).filter(([otherTranslation, otherAllergens]) =>
      translation !== otherTranslation && otherAllergens.has(allergen)
    ).forEach(([_, otherAllergens]) => {
      otherAllergens.delete(allergen);
    });
    allergensTranslations.set(allergen, translation);
  }

  return Array.from(allergensTranslations.keys())
    .sort((a, b) =>
      allergensTranslations.get(a)!
        .localeCompare(allergensTranslations.get(b)!)
    )
    .join(",");
}
