import { State } from "./type.d.ts";

const DIRECTIONS = ["E", "S", "W", "N"];

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function execCommand(instruction: string, state: State): State {
  let { north, east, facing } = state;
  const command = instruction[0];
  const arg = +(instruction.slice(1));
  let steps;
  switch (command) {
    case "N":
      north += arg;
      break;
    case "S":
      north -= arg;
      break;
    case "E":
      east += arg;
      break;
    case "W":
      east -= arg;
      break;
    case "L":
      steps = Math.floor(arg / 90);
      facing = mod((facing - steps), DIRECTIONS.length);
      break;
    case "R":
      steps = Math.floor(arg / 90);
      facing = mod((facing + steps), DIRECTIONS.length);
      break;
    case "F":
      ({ north: north, east: east, facing } = execCommand(
        `${DIRECTIONS[facing]}${arg}`,
        { north: north, east: east, facing },
      ));
      break;
  }
  return { north: north, east: east, facing };
}

export function partOne(instructions: string[]) {
  let state: State = { north: 0, east: 0, facing: 0 };
  for (const instruction of instructions) {
    state = execCommand(instruction, state);
  }
  return Math.abs(state.north) + Math.abs(state.east);
}
