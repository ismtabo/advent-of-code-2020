function nextState(
  token: string,
  stack: Array<string | number>,
): Array<string | number> {
  switch (true) {
    // deno-lint-ignore no-case-declarations
    case Number.isInteger(+token):
      if (stack.length === 0) {
        stack.push(+token);
        break;
      }
      const head = stack.slice(-1).pop()!;
      if (["+", "*"].includes(head.toString())) {
        const operator = stack.pop();
        const left = +stack.pop()!;
        const right = +token;
        const result = operator === "+" ? left + right : left * right;
        stack.push(result);
      } else {
        // head is (
        stack.push(token);
      }
      break;
    case ["*", "+", "("].includes(token):
      stack.push(token);
      break;
    // deno-lint-ignore no-case-declarations
    default:
      // token === )
      const lastNumber = stack.pop()!;
      stack.pop()!; // open parenthesis
      nextState(lastNumber.toString(), stack);
      break;
  }
  return stack.slice();
}

export function evalOperation(operation: string): number {
  const tokens = operation.trim()
    .replace(/\(/g, "( ")
    .replace(/\)/g, " )")
    .split(" ");
  let stack: Array<string | number> = [];

  for (const token of tokens) {
    stack = nextState(token, stack);
  }

  return +stack.pop()!;
}

export function partOne(operations: string[]) {
  return operations.map(evalOperation).reduce((a, b) => a + b);
}
