import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Input } from "./types.d.ts";

export function preprocess(text: string): Input {
  const [fieldsLines, myTicketLines, nearbyLines] = text.split("\n\n");
  const fields = fieldsLines.split("\n").filter((line) =>
    line.trim().length > 0
  )
    .map((line) => {
      const [_, name, firstStart, firstEnd, lastStart, lastEnd] =
        line.match(/(.+?):\s(\d+)\-(\d+)\sor\s(\d+)\-(\d+)/) || [];
      return {
        name: name.trim(),
        rule: {
          first: { start: +firstStart, end: +firstEnd },
          last: { start: +lastStart, end: +lastEnd },
        },
      };
    });
  const ticket = myTicketLines.split("\n")[1].split(",").map((number) =>
    +number
  );
  const nearbyTickets = nearbyLines.split("\n").slice(1).filter((line) =>
    line.trim().length > 0
  ).map((line) => line.split(",").map((number) => +number));
  return { fields, ticket, nearbyTickets };
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
