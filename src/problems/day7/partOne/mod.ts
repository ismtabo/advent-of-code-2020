export const SHYNI_GOLD = "shiny gold";
export const RE_BAG_RULE =
  /(\w+ \w+)\sbags\scontain\s(no other bags|(?:(?:\d+) (?:\w+ \w+) bags?)(?:,\s(?:\d+) (?:\w+ \w+) bags?)*)\./;

export function partOne(rules: string[]) {
  const parentsMap = rules.reduce((acc, rule) => {
    const match = rule.match(RE_BAG_RULE);
    const [_, parent, childrenList] = match ? match : [];
    const children =
      childrenList.replace(/bags?/g, "").replace(/\d+/g, "").match(
        /(\w+ \w+)/g,
      ) ||
      [];
    for (const child of children) {
      const childParents = acc.get(child) || [];
      acc.set(child, childParents.concat(parent));
    }
    return acc;
  }, new Map<string, string[]>().set(SHYNI_GOLD, []));

  let open = [SHYNI_GOLD];
  const closed = new Set();
  let current;
  // deno-lint-ignore no-cond-assign
  while (current = open.shift()) {
    const parents = parentsMap.get(current) || [];
    closed.add(current);
    open = open.concat(
      parents.filter((parent) => !open.includes(parent) && !closed.has(parent)),
    );
  }
  closed.delete(SHYNI_GOLD);
  return closed.size;
}
