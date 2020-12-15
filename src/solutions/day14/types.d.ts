interface MemOperation {
  address: number;
  value: number;
}

type BitMask = string;

export interface Input {
  operations: Array<MemOperation | BitMask>;
}
