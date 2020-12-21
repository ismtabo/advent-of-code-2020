import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

const RE_RULE = /(?<key>\d+):\s(?<rule>.+)/g;

export function preprocess(text: string) {
  const [rulesLines, messagesLines] = text.split("\n\n").map((block) =>
    block.trim()
  );
  const rulesEntries = Array.from(rulesLines.matchAll(RE_RULE))
    .map<[number, Array<string | number[]>]>(
      (match) => {
        const { key, rule } = match.groups!;
        const subrules = rule.split("|")
          .map((subrule) => subrule.trim())
          .map<string | number[]>(
            (subrule) => {
              if (/"\w+"/.test(subrule)) {
                return subrule.replace(/"(\w+)"/, "$1");
              }
              return subrule.split(" ").map((otherKey) => +otherKey);
            },
          );
        return [+key, subrules];
      },
    );
  const rules = new Map<number, Array<string | number[]>>(rulesEntries);
  const messages = messagesLines
    .split("\n")
    .map((message) => message.trim())
    .filter((message) => message.length > 0);
  return { rules, messages };
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
