export interface GenerateNewStateOptions {
  getNeighborFn?: (map: string[][], row: number, col: number) => string[];
  minOccupiedNeighborSeats?: number;
}

export type PartOneOptions = GenerateNewStateOptions;
