import { validPassports } from "../utils.ts";
import { Passport } from "../types.d.ts";

export function partOne(passports: Passport[]) {
  return validPassports(passports).length;
}
