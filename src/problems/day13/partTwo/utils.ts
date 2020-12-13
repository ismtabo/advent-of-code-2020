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

export function chineseRemainder(buses: number[]): number {
  const n: number[] = buses.filter((bus) => !isNaN(bus));
  const a: number[] = buses.map((bus, index) =>
    isNaN(bus) ? NaN : mod((bus - index), bus)
  )
    .filter((bus) => !isNaN(bus));
  const N = n.reduce((a, b) => a * b);
  const elements = n.map((x, i) => {
    const ni = Math.floor(N / x);
    const si = xgcd(ni, x);
    return a[i] * si * ni;
  });
  let x = elements.reduce((a, b) => a + b);
  x = mod(x, N);

  n.forEach((n, i) => {
    console.assert(
      x % n === a[i],
      `Error: ${x} % ${n} = ${x % n} !== ${a[i]}`,
    );
  });

  return x;
}

function xgcd(a: number, b: number): number {
  if (b === 1) {
    return 1;
  }
  const oldB = b;
  let [r, s] = [0, 1];
  while (a > 1) {
    const q = Math.floor(a / b);
    ([a, b] = [b, mod(a, b)]);
    ([r, s] = [s - q * r, r]);
  }
  if (s < 0) {
    s += oldB;
  }
  return s;
}
