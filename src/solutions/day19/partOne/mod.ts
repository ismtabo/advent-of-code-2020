import { buildRegex } from "../utils.ts";

export function partOne(
  { rules, messages }: {
    rules: Map<number, Array<string | number[]>>;
    messages: string[];
  },
) {
  const regexpString = buildRegex(rules);
  const regexp = new RegExp(regexpString);
  return messages.filter((message) => regexp.test(message)).length;
}
