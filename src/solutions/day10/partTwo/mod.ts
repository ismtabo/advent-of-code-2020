function branches(
  rating: number,
  index: number,
  ratings: number[],
) {
  const branches = ratings[index + 1] ? [ratings[index + 1]] : [];
  if (
    ratings[index + 2] &&
    (rating + 2 === ratings[index + 2] || rating + 3 === ratings[index + 2])
  ) {
    branches.push(ratings[index + 2]);
  }
  if (ratings[index + 3] && rating + 3 === ratings[index + 3]) {
    branches.push(ratings[index + 3]);
  }
  return branches;
}

function numberOfLeafs(
  number: number,
  branchesMap: Map<number, number[]>,
  cache: Map<number, number>,
): number {
  if (cache.has(number)) {
    return cache.get(number) || NaN;
  }
  const branches = branchesMap.get(number);
  if (Array.isArray(branches) && branches?.length > 0) {
    const leafs = branches.map((other) =>
      numberOfLeafs(other, branchesMap, cache)
    )
      .reduce(
        (acc, val) => acc + val,
        0,
      );
    cache.set(number, leafs);
    return leafs;
  }
  cache.set(number, 1);
  return 1;
}

export function partTwo(ratings: number[]) {
  const maxRating = Math.max(...ratings) + 3;
  const sortedRatings = [0].concat(ratings.slice().sort((a, b) => a - b))
    .concat(
      maxRating,
    );
  const branchesMap = new Map(
    sortedRatings.map((
      rating,
      i,
    ) => ([rating, branches(rating, i, sortedRatings)])),
  );
  return numberOfLeafs(0, branchesMap, new Map());
}
