interface Range {
  start: number;
  end: number;
}

interface Rule {
  first: Range;
  last: Range;
}

interface Field {
  name: string;
  rule: Rule;
}

export interface Input {
  fields: Field[];
  ticket: number[];
  nearbyTickets: number[][];
}
