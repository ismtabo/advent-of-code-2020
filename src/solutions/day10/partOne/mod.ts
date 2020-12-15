export function partOne(ratings: number[]) {
  let jolt = 0;
  const sortedRatings = ratings.sort((a, b) => a - b);
  const oneDiffs: number[] = [];
  const threeDiffs: number[] = [];

  while (sortedRatings.length > 0) {
    const possibleRating = sortedRatings.shift() || NaN;
    const ratingsDiff = (possibleRating) - jolt;
    if (ratingsDiff === 1) {
      oneDiffs.push(possibleRating);
      jolt = possibleRating;
    } else if (ratingsDiff === 3) {
      threeDiffs.push(possibleRating);
      jolt = possibleRating;
    } else {
      possibleRating;
    }
  }

  return oneDiffs.length * (threeDiffs.length + 1);
}
