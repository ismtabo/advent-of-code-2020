import { partOne, Passport } from "./partOne/index.ts";
import { partTwo } from "./partTwo/index.ts";

export function main(text: string, isPart2: boolean) {
  const passports: Passport[] = text
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

  if (isPart2) {
    return partTwo(passports);
  }

  return partOne(passports);
}
