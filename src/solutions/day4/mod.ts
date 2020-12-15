import { partOne } from "./partOne/mod.ts";
import { Passport } from "./types.d.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string): Passport[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .split("\n\n")
    .filter(Boolean)
    .map((passport) =>
      passport
        .replace(/\n/g, " ")
        .split(" ")
        .map((field) => field.split(":"))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    );
}

export function main(text: string, isPart2: boolean) {
  const passports = preprocess(text);

  if (isPart2) {
    return partTwo(passports);
  }

  return partOne(passports);
}

export { partOne, partTwo };
