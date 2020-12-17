export type State = Map<string, string>;

export interface Boundary {
  start: number;
  end: number;
}

export interface Boundaries {
  x: Boundary;
  y: Boundary;
  z: Boundary;
}

export interface MetaBoundaries extends Boundaries {
  w: Boundary;
}

export interface Coordinate {
  x: number;
  y: number;
  z: number;
  w?: number;
}

export type Margin = Coordinate;
