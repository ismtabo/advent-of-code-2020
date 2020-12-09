export function partTwo(groups: string[]) {
  const answersPerGroup = groups.map(
    (group) => [...new Set(group.replaceAll("\n", ""))],
  );
  return answersPerGroup
    .map((answers, groupIndex) =>
      answers.filter((answer) =>
        groups[groupIndex].split("\n").every((person) =>
          person.includes(answer)
        )
      )
    )
    .map((answeredByEveryOne) => answeredByEveryOne.length)
    .reduce(
      (acc, val) => acc + val,
      0,
    );
}
