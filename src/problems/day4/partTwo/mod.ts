import { Passport, validPassports } from "../partOne/mod.ts";

export function validateField(field: string, value: string): boolean {
  let year, height;
  // deno-lint-ignore prefer-const
  let unit: string;
  switch (field) {
    case "byr":
      if (!/^\d{4}$/.test(value)) {
        return false;
      }
      year = +value;
      return 1920 <= year && year <= 2002;
    case "iyr":
      if (!/^\d{4}$/.test(value)) {
        return false;
      }
      year = +value;
      return 2010 <= year && year <= 2020;
    case "eyr":
      if (!/^\d{4}$/.test(value)) {
        return false;
      }
      year = +value;
      return 2020 <= year && year <= 2030;
    case "hgt":
      height = +value.slice(0, -2);
      unit = value.slice(-2);
      if (isNaN(height)) {
        return false;
      }
      switch (unit) {
        case "cm":
          height = +height;
          return 150 <= height && height <= 193;
        case "in":
          height = +height;
          return 59 <= height && height <= 76;
        default:
          return false;
      }
    case "hcl":
      return /#[0-9a-f]{6}/.test(value);
    case "ecl":
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
        value.trim(),
      );
    case "pid":
      return /^\d{9}$/.test(value);
    default:
      return true;
  }
}

export function partTwo(passports: Passport[]): number {
  return validPassports(passports).filter((passport) =>
    Object.entries(passport).every(([field, value]) =>
      validateField(field, value)
    )
  ).length;
}
