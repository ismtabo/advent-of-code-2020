import { Operation } from "../types.d.ts";

export function partTwo(instructions: Operation[]) {
  const jumpIndexes = instructions.map(({ name }, index) =>
    /jmp|nop/.test(name) ? index : NaN
  ).filter((index) => !isNaN(index)).reverse();
  const result = runProgram(instructions);
  if (!isNaN(result)) {
    return result;
  }

  let jumpIndex;
  // deno-lint-ignore no-cond-assign
  while (jumpIndex = jumpIndexes.shift()) {
    const instructionsCopy = deepCopy(instructions);
    const { name } = instructionsCopy[jumpIndex];
    instructionsCopy[jumpIndex].name = name === "jmp" ? "nop" : "jmp";
    const result = runProgram(instructionsCopy);
    if (!isNaN(result)) {
      return result;
    }
  }
}

function deepCopy(instructions: Operation[]): Operation[] {
  return instructions.map((operation) => ({ ...operation }));
}

function runProgram(instructions: Operation[]): number {
  let operationPointer = 0;
  let accumulator = 0;
  const isVisited = new Array(instructions.length).fill(false);
  while (operationPointer < instructions.length) {
    if (isVisited[operationPointer]) {
      return NaN;
    }

    const { name: operation, arg } = instructions[operationPointer];
    isVisited[operationPointer] = true;
    switch (operation) {
      case "jmp":
        operationPointer += arg;
        break;
      // deno-lint-ignore no-fallthrough
      case "acc":
        accumulator += arg;
      case "nop":
        operationPointer += 1;
        break;
    }
  }
  return accumulator;
}
