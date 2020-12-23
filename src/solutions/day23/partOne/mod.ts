function getDestination(
  start: number,
  pickedUpNumbers: number[],
  cups: number[],
) {
  let current = start;
  const min = Math.min(...pickedUpNumbers.concat(cups));
  const max = Math.max(...pickedUpNumbers.concat(cups));
  do {
    current--;
    if (current < min) {
      current = max;
    }
  } while (pickedUpNumbers.includes(current));
  return current;
}

export function iterations(
  input: number[],
  times = 100,
  getDestinationFn = getDestination,
) {
  const numbers = input.slice();
  while (times-- > 0) {
    const currentCup = numbers.shift()!;
    const pickedUpCups = numbers.splice(0, 3);
    const destination = getDestinationFn(currentCup, pickedUpCups, numbers);
    const indexOfDestination = numbers.indexOf(destination);
    numbers.splice(indexOfDestination + 1, 0, ...pickedUpCups);
    numbers.push(currentCup);
  }
  return numbers;
}

export function partOne(input: number[]) {
  const numbers = iterations(input);
  const indexOf1 = numbers.indexOf(1);
  if (indexOf1 === 0) {
    return numbers.slice(1).join("");
  } else if (indexOf1 === numbers.length - 1) {
    return numbers.slice(0, -1).join("");
  }
  return numbers.slice(indexOf1 + 1).concat(numbers.slice(0, indexOf1)).join(
    "",
  );
}
