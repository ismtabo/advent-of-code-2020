import { Input } from "../types.d.ts";
import { chineseRemainder } from "./utils.ts";

export function partTwo(input: Input) {
  return Number(chineseRemainder(input.buses));
}
