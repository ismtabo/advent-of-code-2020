import { Operation } from "../models.ts";

export function partOne(instructions: Operation[]) {
  let OPERATION_POINTER = 0;
  let accumulator = 0;
  const isVisited = new Array(instructions.length).fill(false);
  while (OPERATION_POINTER < instructions.length) {
    if (isVisited[OPERATION_POINTER]) {
      return accumulator;
    }

    const { name: operation, arg } = instructions[OPERATION_POINTER];
    isVisited[OPERATION_POINTER] = true;
    switch (operation) {
      case "jmp":
        OPERATION_POINTER += arg;
        break;
      // deno-lint-ignore no-fallthrough
      case "acc":
        accumulator += arg;
      case "nop":
        OPERATION_POINTER += 1;
        break;
    }
  }
  return accumulator;
}
