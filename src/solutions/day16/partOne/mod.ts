import { Input, Rule } from "../types.d.ts";

export function passRule(rule: Rule, number: number) {
  return (rule.first.start <= number && number <= rule.first.end) ||
    (rule.last.start <= number && number <= rule.last.end);
}

export function getInvalidTickets(input: Input) {
  return input.nearbyTickets
    .map((ticket, index) => ({
      index,
      numbers: ticket.filter((number) =>
        !input.fields.some((field) => (passRule(field.rule, number)))
      ),
    }))
    .filter(({ numbers }) => numbers.length > 0);
}

export function partOne(input: Input) {
  return getInvalidTickets(input)
    .flatMap(({ numbers }) => numbers)
    .reduce((a, b) => a + b);
}
