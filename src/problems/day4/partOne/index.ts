const requiredFields = [
  "byr", // (Birth Year)
  "iyr", // (Issue Year)
  "eyr", // (Expiration Year)
  "hgt", // (Height)
  "hcl", // (Hair Color)
  "ecl", // (Eye Color)
  "pid", // (Passport ID)
  //   "cid", // (Country ID)
];

export interface Passport {
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
  cid?: string;
}

export function validPassports(passports: Passport[]): Passport[] {
  return passports.filter((passport, i) =>
    requiredFields.every((field) => Object.keys(passport).includes(field))
  );
}

export function partOne(passports: Passport[]): number {
  return validPassports.length;
}
