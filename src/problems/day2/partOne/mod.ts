import { Case } from "../types.d.ts";

export function partOne(cases: Case[]) {
  return cases.filter(({ rule: { min, max, letter }, password }) => {
    const count = [...password].reduce(
      (acc, char) => char === letter ? acc + 1 : acc,
      0,
    );
    return min <= count && count <= max;
  }).length;
}
