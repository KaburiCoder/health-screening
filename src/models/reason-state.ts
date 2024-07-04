export interface ReasonState extends ReasonSub {
  id: string;
}

export interface ReasonSub {
  text: string;
  seq: number;
  sub?: ReasonSub[];
}
