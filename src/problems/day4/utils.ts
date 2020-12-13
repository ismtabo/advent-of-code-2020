import { Passport } from "./types.d.ts";

const requiredFields = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
];

export function validPassports(passports: Passport[]): Passport[] {
  return passports.filter((passport) =>
    requiredFields.every((field) => Object.keys(passport).includes(field))
  );
}
