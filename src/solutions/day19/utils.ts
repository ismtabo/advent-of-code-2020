function joinMultipleRegex(multipleRegex: string[], join = "") {
  return multipleRegex.length === 1
    ? multipleRegex[0]
    : `${multipleRegex.map((subRegex) => `(${subRegex})`).join(join)}`;
}

export function buildRule(
  ruleKey: number,
  rules: Map<number, Array<string | number[]>>,
  cache: Map<number, string>,
): string {
  if (cache.has(ruleKey)) {
    return cache.get(ruleKey)!;
  }

  const rule = rules.get(ruleKey)!;
  const subRegex = rule
    .map((subrule) => {
      if (typeof subrule === "string") {
        return subrule;
      }
      return joinMultipleRegex(subrule
        .map((subSubrule) => buildRule(subSubrule, rules, cache)));
    });
  const regex = joinMultipleRegex(subRegex, "|");
  cache.set(ruleKey, regex);
  return regex;
}

export function buildRegex(rules: Map<number, Array<string | number[]>>) {
  const cache = new Map<number, string>();
  return "^" + buildRule(0, rules, cache) + "$";
}
