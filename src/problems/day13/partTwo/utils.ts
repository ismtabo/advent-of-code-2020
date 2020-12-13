function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

// NOTE: Reference https://davidwees.com/chineseremaindertheorem/
export function calculate(buses: number[]): number {
  const n: number[] = buses.filter((bus) => !isNaN(bus));
  const a: number[] = buses.map((bus, index) =>
    isNaN(bus) ? NaN : mod((bus - index), bus)
  )
    .filter((bus) => !isNaN(bus));
  const e: number[] = [];
  let tmp;
  let x = 0;
  const N = n.reduce((a, b) => a * b);

  let max = 1;
  for (const i in n) {
    max = n[i] * max;
  }

  for (let i = 0; i < n.length; i++) {
    const n_i = Math.floor(N / n[i]);
    tmp = extended_gcd(n[i], n_i);
    e[i] = tmp[1] * n_i;
  }
  for (let i = 0; i < n.length; i++) {
    x += e[i] * a[i];
  }
  //let answer = extended_gcd(x,y);

  if (x >= max) {
    x = x % max;
  }

  while (x < 0) {
    x = x + max;
  }

  n.forEach((n, i) => {
    console.assert(x % n === a[i], `Error: ${x} % ${n} = ${x % n} !== ${a[i]}`);
  });
  // testing something
  return x;
}

function extended_gcd(a: number, b: number): number[] {
  if (a % b == 0) {
    return [0, 1];
  } else {
    const temp = extended_gcd(b, a % b);
    const temp2 = [temp[1], temp[0] - temp[1] * (Math.floor(a / b))];
    return temp2;
  }
}

function modBigInt(n: bigint, m: bigint): bigint {
  return ((n % m) + m) % m;
}

// NOTE: Reference https://rosettacode.org/wiki/Chinese_remainder_theorem
export function chineseRemainder(buses: number[]): bigint {
  const numbers: bigint[][] = buses.map((bus, i) => [bus, i]).filter(([bus]) =>
    !isNaN(bus)
  ).map((busInfo) => busInfo.map(BigInt));
  const n: bigint[] = numbers.map(([number]) => number);
  const a: bigint[] = numbers.map(([bus, index]) =>
    modBigInt(bus - index, bus)
  );
  const N = n.reduce((a, b) => a * b);
  const elements = n.map((x, i) => {
    const ni = N / x;
    const si = xgcd(ni, x);
    return a[i] * si * ni;
  });
  let x = elements.reduce((a, b) => a + b);
  x = modBigInt(x, N);

  n.forEach((n, i) => {
    console.assert(
      x % n === a[i],
      `Error: ${x} % ${n} = ${x % n} !== ${a[i]}`,
    );
  });

  return x;
}

function xgcd(a: bigint, b: bigint): bigint {
  if (b === 1n) {
    return 1n;
  }
  const oldB = b;
  let [r, s] = [0n, 1n];
  while (a > 1) {
    const q = a / b;
    ([a, b] = [b, modBigInt(a, b)]);
    ([r, s] = [s - q * r, r]);
  }
  if (s < 0) {
    s += oldB;
  }
  return s;
}
