import { RE_BAG_RULE, SHYNI_GOLD } from "../partOne/mod.ts";

interface Bag {
  bag: string;
  number: number;
}

export function partTwo(rules: string[]) {
  const childMap = rules.reduce(
    (acc, rule) => {
      const match = rule.match(RE_BAG_RULE);
      const [_, parent, childrenList] = match ? match : [];
      if (childrenList.includes("no other bags")) {
        return acc.set(parent, []);
      }
      const children = (childrenList.replace(/bags?/g, "")).split(", ").map(
        (child) => {
          const [_, number, bag] = child.match(/(\d+) (\w+ \w+)/) || [];
          return { number: +number, bag };
        },
      );
      return acc.set(parent, children);
    },
    new Map<string, Bag[]>(),
  );

  let open = [{ bag: SHYNI_GOLD, number: 1 }];
  const closed = new Set();
  let current: Bag | undefined;
  let count = 0;
  // deno-lint-ignore no-cond-assign
  while (current = open.shift()) {
    if (!current.bag) {
      break;
    }
    const children: Bag[] | undefined = childMap.get(current.bag);
    closed.add(current);
    count += current.number;
    if (Array.isArray(children)) {
      open = open.concat(
        (children || []).map(({ bag, number }) => ({
          bag,
          number: number * (current ? current.number : 1),
        })),
      );
    }
  }
  return count - 1;
}
