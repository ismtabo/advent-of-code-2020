import { dirname, join } from "https://deno.land/std/path/mod.ts";
import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { Passport } from "../partOne/index.ts";
import { partTwo, validateField } from "./index.ts";

const __dirname = dirname(new URL(import.meta.url).pathname);

const cases = [
  ["byr", "valid", "2002"],
  ["byr", "invalid", "2003"],
  ["hgt", "valid", "60in"],
  ["hgt", "valid", "190cm"],
  ["hgt", "invalid", "190in"],
  ["hgt", "invalid", "190"],
  ["hcl", "valid", "#123abc"],
  ["hcl", "invalid", "#123abz"],
  ["hcl", "invalid", "123abc"],
  ["ecl", "valid", "brn"],
  ["ecl", "invalid", "wat"],
  ["pid", "valid", "000000001"],
  ["pid", "invalid", "0123456789"],
];

Deno.test("validatorFieldTest", () => {
  for (const [field, isValid, value] of cases) {
    const expectedValid = isValid === "valid";
    const valid = validateField(field, value);
    assertEquals(
      expectedValid,
      valid,
      `validation fails for case:${field}${value}`,
    );
  }
});

Deno.test("Day 4 - All invalid", () => {
  const text = Deno.readTextFileSync(join(__dirname, "/invalid.txt"));
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
  const result = partTwo(passports);
  assertEquals(result, 0);
});

Deno.test("Day 4 - All valid", () => {
  const text = Deno.readTextFileSync(join(__dirname, "valid.txt"));
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
  const result = partTwo(passports);
  assertEquals(result, passports.length);
});
