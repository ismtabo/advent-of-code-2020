function toPostFix(tokens: string[]) {
  const stack: string[] = [];
  const postFix: string[] = [];
  // NOTE: Addition is evaluated before multiplication
  const precedences = new Map<string, number>([["+", 1], ["*", 0]]);
  let head;
  for (const token of tokens) {
    switch (true) {
      case Number.isInteger(+token):
        stack.push(token);
        break;
      case token === "(":
        stack.push(token);
        break;
      case token === ")":
        while (head = stack.slice(-1).pop(), head != null && head !== "(") {
          postFix.push(stack.pop()!);
        }
        stack.pop();
        break;
      default:
        // Operator is found
        if (stack.length === 0 || stack.slice(-1).pop() === "(") {
          stack.push(token);
          break;
        }
        // precedence of the operator <= precedence of the top of the stack
        while (
          head = stack.slice(-1).pop(),
            stack.length !== 0 && head !== "(" &&
            (!precedences.has(head!) || (precedences.has(head!) &&
              (precedences.get(token!)! <= precedences.get(head!)!)))
        ) {
          postFix.push(stack.pop()!);
        }
        stack.push(token);
        break;
    }
  }
  postFix.push(...stack.reverse());
  return postFix;
}

function evalPostFix(tokens: string[]) {
  const stack: Array<string | number> = [];
  for (const token of tokens) {
    switch (true) {
      case Number.isInteger(+token):
        stack.push(+token);
        break;
      // deno-lint-ignore no-case-declarations
      default:
        // operator is found
        const left = +stack.pop()!;
        const right = +stack.pop()!;
        const result = token === "*" ? left * right : left + right;
        stack.push(result);
    }
  }
  return +stack.pop()!;
}

// NOTE: Reference http://faculty.cs.niu.edu/~hutchins/csci241/eval.htm
export function evalOperation(operation: string): number {
  const tokens = operation.trim()
    .replace(/\(/g, "( ")
    .replace(/\)/g, " )")
    .split(" ");

  const postFix = toPostFix(tokens);
  return evalPostFix(postFix);
}

export function partTwo(operations: string[]) {
  return operations.map(evalOperation).reduce((a, b) => a + b);
}
