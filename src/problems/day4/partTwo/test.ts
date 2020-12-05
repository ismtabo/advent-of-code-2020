import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { validateField } from "./index.ts";

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
