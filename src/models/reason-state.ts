export class ReasonState implements ReasonSub {
  id!: string;
  text!: string;
  seq!: number;
  subs?: ReasonSub[] | undefined;

  static toReasonSubs(reasonStates: ReasonState[]): ReasonSub[] {
    let seq: number = 0;
    const subs = reasonStates.reduce((accSubs: ReasonSub[], reasonState: ReasonState) => {
      const isTextExisting = accSubs.some(
        (sub) =>
          sub.text.trim().toLowerCase() === reasonState.text.trim().toLowerCase(),
      );

      if (isTextExisting || !reasonState.text.trim()) {
        return accSubs;
      } else {
        const { id, ...subs } = reasonState;
        return accSubs.concat({ ...subs, seq: ++seq });
      }
    }, []);
    return subs;
  }
}

export class ReasonSub {
  text!: string;
  seq!: number;
  subs?: ReasonSub[];

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