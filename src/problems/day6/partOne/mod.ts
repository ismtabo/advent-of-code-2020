export function partOne(groups: string[]): number {
  const distinctGroups = groups.map((line) => line.replaceAll("\n", "")).map((
    group,
  ) => [...new Set(group)]);
  const groupsLength = distinctGroups.map((group) => group.length);
  return groupsLength.reduce(
    (acc, val) => acc + val,
    0,
  );
}
