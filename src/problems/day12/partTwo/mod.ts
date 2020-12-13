import { Point, State } from "./type.d.ts";

function rotate(point: Point, degrees: number, clockwise: boolean): Point {
  switch (true) {
    case (degrees === 90 && clockwise) || (degrees === 270 && !clockwise):
      return { north: -point.east, east: point.north };
    case degrees === 180:
      return { north: -point.north, east: -point.east };
    case (degrees === 90 && !clockwise) || (degrees === 270 && clockwise):
      return { north: point.east, east: -point.north };
    default:
      throw Error("rotation not implemented yet");
  }
}

export function execCommand(
  instruction: string,
  state: State,
): State {
  let { north, east, wayPoint: { north: wayPointNorth, east: wayPointEast } } =
    state;
  const command = instruction[0];
  const arg = +(instruction.slice(1));
  switch (command) {
    case "N":
      wayPointNorth += arg;
      break;
    case "S":
      wayPointNorth -= arg;
      break;
    case "E":
      wayPointEast += arg;
      break;
    case "W":
      wayPointEast -= arg;
      break;
    case "L":
      ({ north: wayPointNorth, east: wayPointEast } = rotate(
        { north: wayPointNorth, east: wayPointEast },
        arg,
        false,
      ));
      break;
    case "R":
      ({ north: wayPointNorth, east: wayPointEast } = rotate(
        { north: wayPointNorth, east: wayPointEast },
        arg,
        true,
      ));
      break;
    case "F":
      north += wayPointNorth * arg;
      east += wayPointEast * arg;
      break;
  }
  return {
    north: north,
    east: east,
    wayPoint: { north: wayPointNorth, east: wayPointEast },
  };
}

export function partTwo(instructions: string[]) {
  let state: State = {
    north: 0,
    east: 0,
    wayPoint: { north: 1, east: 10 },
  };
  for (const instruction of instructions) {
    state = execCommand(instruction, state);
  }
  return Math.abs(state.north) + Math.abs(state.east);
}
