import { Case } from "../partOne/mod.ts";

export function partTwo(cases: Case[]) {
  return cases.filter(({ rule: { min, max, letter }, password }) => {
    const firstAppearance = password[min - 1];
    const lastAppearance = password[max - 1];
    return (firstAppearance !== lastAppearance) &&
      (firstAppearance === letter || lastAppearance === letter);
  }).length;
}
