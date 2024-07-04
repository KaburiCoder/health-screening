export interface ReasonState extends ReasonSub {
  id: string;
}

export class ReasonSub {
  text!: string;
  seq!: number;
  sub?: ReasonSub[];

  static toState(reasonSub: ReasonSub): ReasonState {
    return { ...reasonSub, id: reasonSub.seq.toString() }
  }

  static toStateList(subs: ReasonSub[] | undefined): ReasonState[] {
    return (subs ?? []).map(item => ReasonSub.toState(item));
  }

  static createState(subs: ReasonSub[] | undefined): ReasonState {
    const maxSeq = subs && subs.length > 0 ? Math.max(...subs.map(sub => sub.seq)) : 0
    const seq = maxSeq + 1;
    return { id: seq.toString(), seq, text: "" }
  }
}

export class ReasonSubList {
  private items: ReasonSub[];

  constructor(items: ReasonSub[] = []) {
    this.items = items;
  }

  add(reasonSub: ReasonSub): void {
    this.items.push(reasonSub);
  }

  remove(index: number): void {
    this.items.splice(index, 1);
  }

  get(index: number): ReasonSub {
    return this.items[index];
  }

  getAll(): ReasonSub[] {
    return this.items;
  }

  toStateList(): ReasonState[] {
    return this.items.map(item => ReasonSub.toState(item));
  }
}