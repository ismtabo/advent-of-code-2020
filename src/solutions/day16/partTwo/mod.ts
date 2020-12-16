import { getInvalidTickets, passRule } from "../partOne/mod.ts";
import { Input } from "../types.d.ts";

export function partTwo(input: Input) {
  const invalidIndexes = getInvalidTickets(input).map(({ index }) => index);
  const validTickets = input.nearbyTickets.filter((_, index) =>
    !invalidIndexes.includes(index)
  );
  const ticketFieldsIndexes = [...new Array(input.fields.length).keys()];
  // Indexes for each rule where some value does not pass the rule
  const fieldsWithPossibleIndexEntries = input.fields
    .map((field) => {
      const indexes = validTickets
        .map((ticket) =>
          ticket
            .map((number, index) => ({
              number,
              index,
            }))
            .filter(({ number }) => !passRule(field.rule, number))
            .map(({ index }) => index)
        )
        .flatMap((indexes) => indexes);
      return { name: field.name, indexes: [...new Set(indexes)] };
    })
    .map(({ name, indexes: invalidIndexes }) => ({
      name,
      indexes: ticketFieldsIndexes.filter((index) =>
        !invalidIndexes.includes(index)
      ),
    }))
    .sort(({ indexes: a }, { indexes: b }) => a.length - b.length);

  // Reduce the number of possible indexes for each field
  const fieldReverseMap = fieldsWithPossibleIndexEntries
    .map((entry) => {
      console.assert(
        entry.indexes.length === 1,
        "Possible number of indexes for " + entry.name + " are " +
          entry.indexes,
      );
      const uniqueValidIndex = entry.indexes[0];
      fieldsWithPossibleIndexEntries
        .filter(({ name, indexes }) =>
          name !== entry.name && indexes.includes(uniqueValidIndex)
        ).forEach((otherEntry) => {
          const deleteIndex = otherEntry.indexes.indexOf(uniqueValidIndex);
          otherEntry.indexes.splice(deleteIndex, 1);
        });
      return [uniqueValidIndex, entry.name];
    })
    .reduce<{ [_: number]: string }>(
      (acc, [index, name]) => ({ ...acc, [index]: name }),
      {},
    );

  return input.ticket
    .filter((_, index) =>
      (fieldReverseMap[index] || "").startsWith("departure")
    )
    .reduce((a, b) => a * b);
}
