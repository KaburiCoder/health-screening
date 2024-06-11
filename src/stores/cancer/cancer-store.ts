import Joi, { string } from "joi";
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { validateSchema } from "../utils/validate-utli";
import { inputMessage, selectMessage } from "../lifestyle/joi-messages";
import { removeEmptyValues } from "@/lib/utils/object.util";

export enum CancerHas {
  예 = "1",
  아니오 = "2"
}

export enum CancerHasTh {
  없다 = "1",
  있다 = "2",
  모름 = "3"
}

export enum CancerPresence {
  무 = "1",
  유 = "2",
}

export enum CancerWeight {
  아니오 = "1",
  체중감소 = "2"
}

export enum CancerMensturation {
  n세 = "1",
  초경이_없었음 = "2"
}

export enum CancerMensturationState {
  아직_월경이_있음 = "1",
  자궁적출술을_하였음 = "2",
  폐경되었음 = "3",
  병력으로_월경하지_않음 = "4",
}

export interface ICancerHasFamily {
  has: CancerHasTh;
  self?: CancerPresence;
  parents?: CancerPresence;
  brother?: CancerPresence;
  sister?: CancerPresence;
  children?: CancerPresence;
}

export interface ICancerN1 {
  has: CancerHas;
  symptom?: string;
}

export interface ICancerN2 {
  has: CancerWeight;
  kg?: number;
}

export interface ICancerN3 {
  /** 위암 */
  stomach?: ICancerHasFamily;
  /** 유방암 */
  breast?: ICancerHasFamily;
  /** 대장암 */
  colon?: ICancerHasFamily;
  /** 간암 */
  liver?: ICancerHasFamily;
  /** 자궁경부암 */
  cervical?: ICancerHasFamily;
  /** 폐암 */
  lung?: ICancerHasFamily;
  etc?: ICancerHasFamily & { kind: string };
}

export interface ICancerN4 {
  weJoyung?: string;
  weNesigyung?: string;
  yubang?: string;
  daejangJamhyul?: string;
  daejangNesigyung?: string;
  jagungGyungbu?: string;
  pyeHyungbuCT?: string;
  ganChoumpa?: string;
}


export interface ICancerN5 {
  has?: CancerPresence;
  wegueyang?: CancerPresence;
  weyum?: CancerPresence;
  jangsangpi?: CancerPresence;
  weyongjong?: CancerPresence;
  etc?: CancerPresence;
}

export interface ICancerN6 {
  has?: CancerPresence;
  daejangyongjong?: CancerPresence;
  daejangyeom?: CancerPresence;
  cron?: CancerPresence;
  chijil?: CancerPresence;
  etc?: CancerPresence;
}

export interface ICancerN7 {
  has?: CancerPresence;
  bGanyum?: CancerPresence;
  mansungB?: CancerPresence;
  mansungC?: CancerPresence;
  gangyungbyun?: CancerPresence;
  etc?: CancerPresence;
}

export interface ICancerN8 {
  has?: CancerPresence;
  mansungPye?: CancerPresence;
  pyegulhack?: CancerPresence;
  pyegyuljul?: CancerPresence;
  ganjilPye?: CancerPresence;
  jinpye?: CancerPresence;
  etc?: CancerPresence;
}

export interface ICancerN9 {
  has?: CancerMensturation;
  age?: number;
}

export interface ICancerN10 {
  state?: CancerMensturationState;
  age?: number;
}

export interface CancerState {
  sex?: "M" | "F";
  n1?: ICancerN1;
  n2?: ICancerN2;
  n3?: ICancerN3;
  n4?: ICancerN4;
  n5?: ICancerN5;
  n6?: ICancerN6;
  n7?: ICancerN7;
  n8?: ICancerN8;
  n9?: ICancerN9;
  n10?: ICancerN10;
  n11?: string;
  n12?: string;
  n13?: string;
  n14?: string;
  n15?: string;
}

interface Actions {
  setSex: (sex?: "M" | "F") => void;
  setN1Has: (has: CancerHas) => void;
  setN1Symptom: (symptom: string) => void;
  setN2Has: (has: CancerWeight) => void;
  setN2Kg: (kg: number | undefined) => void;

  setN3Has: (key: keyof ICancerN3, value: CancerHasTh) => void;
  setN3HasFam: (n3Key: keyof ICancerN3, key: keyof ICancerHasFamily, value: CancerPresence) => void;
  setN3EtcKind: (kind: string) => void;
  setN4Select: (key: keyof ICancerN4, value: string) => void;
  setN5Has: (has: CancerPresence) => void;
  setN5: (n5Key: keyof ICancerN5, value: CancerPresence) => void;
  setN6: (n6Key: keyof ICancerN6, value: CancerPresence) => void;
  setN7: (n7Key: keyof ICancerN7, value: CancerPresence) => void;
  setN8: (n8Key: keyof ICancerN8, value: CancerPresence) => void;
  setN9Has: (has: CancerMensturation) => void;
  setN9Age: (age: number | undefined) => void;
  setN10State: (state: CancerMensturationState) => void;
  setN10Age: (age: number | undefined) => void;
  setN11: (n11: string) => void;
  setN12: (n12: string) => void;
  setN13: (n13: string) => void;
  setN14: (n14: string) => void;
  setN15: (n15: string) => void;
  setState: (state: CancerState) => void;
  validate: () => Joi.ValidationResult<CancerState>;
  isMenopause: () => boolean;
  clear: () => void;
}

const initialState: CancerState = {
  sex: undefined,
  n1: undefined,
  n2: undefined,
  n3: undefined,
  n4: undefined,
  n5: undefined,
  n6: undefined,
  n7: undefined,
  n8: undefined,
  n9: undefined,
  n10: undefined,
  n11: undefined,
  n12: undefined,
  n13: undefined,
  n14: undefined,
  n15: undefined,
};

const stateCreator: StateCreator<CancerState & Actions> = (set, get) => {

  return {
    ...initialState,
    setSex: (sex) => set(() => ({ sex })),
    setN1Has: (has) => set(({ n1 }) => ({ n1: { has, symptom: has === CancerHas.예 ? n1?.symptom : undefined } })),
    setN1Symptom: (symptom) => set(({ n1 }) => ({ n1: { has: n1!.has, symptom } })),
    setN2Has: (has) => set(({ n2 }) => ({ n2: { has, kg: has === CancerWeight.체중감소 ? n2?.kg : undefined } })),
    setN2Kg: (kg) => set(({ n2 }) => ({ n2: { has: n2!.has, kg } })),
    setN3Has: (key, has) => set(({ n3 }) => {
      return {
        n3: {
          ...n3, [key]: has === CancerHasTh.있다
            ? { ...n3?.[key], has }
            : { has }
        }
      }
    }),
    setN3HasFam: (n3Key, key, value) => set(({ n3 }) => {
      return {
        n3: {
          ...n3, [n3Key]: {
            ...n3?.[n3Key], [key]: value,
          }
        }
      }
    }),
    setN3EtcKind: (kind) => set(({ n3 }) => {
      return {
        n3: {
          ...n3, etc: {
            ...(n3?.etc as any), kind,
          }
        }
      }
    }),
    setN4Select: (key, value) => set(({ n4 }) => {
      return {
        n4: {
          ...n4, [key]: value
        }
      }
    }),
    setN5Has: (has) => set(({ n5 }) => ({ n5: has === CancerPresence.유 ? { ...n5, has } : { has } })),
    setN5: (key, value) => set(({ n5 }) => {
      if (key === "has") {
        return { n5: { has: value } }
      }

      return { n5: { ...n5, [key]: value, has: CancerPresence.유, } }
    }),
    setN6: (key, value) => set(({ n6 }) => {
      if (key === "has") {
        return { n6: { has: value } }
      }

      return { n6: { ...n6, [key]: value, has: CancerPresence.유, } }
    }),
    setN7: (key, value) => set(({ n7 }) => {
      if (key === "has") {
        return { n7: { has: value } }
      }

      return { n7: { ...n7, [key]: value, has: CancerPresence.유, } }
    }),
    setN8: (key, value) => set(({ n8 }) => {
      if (key === "has") {
        return { n8: { has: value } }
      }

      return { n8: { ...n8, [key]: value, has: CancerPresence.유, } }
    }),
    setN9Has: (has) => set(({ n9 }) => {
      return has === CancerMensturation.초경이_없었음
        ? { n9: { has }, n10: undefined, n11: undefined, n12: undefined, n13: undefined, n15: undefined }
        : { n9: { ...n9, has } }
    }),
    setN9Age: (age) => set(({ n9 }) => ({ n9: { ...n9, age } })),
    setN10State: (state) => set(({ n10 }) => ({ n10: state === CancerMensturationState.폐경되었음 ? { ...n10, state } : { state, age: undefined } })),
    setN10Age: (age) => set(({ n10 }) => {
      if (n10?.state !== CancerMensturationState.폐경되었음) {
        return { n10: { ...n10, age }, n11: undefined }
      }
      return { n10: { ...n10, age } }
    }),
    setN11: (n11) => set(() => ({ n11 })),
    setN12: (n12) => set(() => {
      if (n12 === "3") {
        return { n12, n13: undefined }
      }
      return { n12 }
    }),
    setN13: (n13) => set(() => ({ n13 })),
    setN14: (n14) => set(() => ({ n14 })),
    setN15: (n15) => set(() => ({ n15 })),
    setState: (state) => set(() => ({ ...removeEmptyValues(state) })),
    isMenopause: () => get().n10?.state === CancerMensturationState.폐경되었음,
    validate: () => validateSchema({ state: get(), initialState, schema }),
    clear: () => set(initialState),
  }
};

export const useCancerStore = create(devtools(stateCreator));

const n3FamSchema = Joi.object<ICancerHasFamily>({
  has: Joi.string().required(),
  self: Joi.string(),
  brother: Joi.string(),
  children: Joi.string(),
  parents: Joi.string(),
  sister: Joi.string(),
}).custom((value, helpers) => {
  if (value.has === CancerHasTh.있다) {
    const familyKeys = ['self', 'brother', 'children', 'parents', 'sister'];
    // 나머지 속성 중 하나라도 1인지 확인
    const hasData = familyKeys.some(key => value[key] === CancerPresence.유);
    if (!hasData) {
      return helpers.error("custom")
    }
  }
  return value;
}).messages({ "custom": "대상 중 하나는 반드시 선택해주세요." })

const etcSchema = (n3FamSchema as Joi.ObjectSchema).keys({
  kind: Joi.string().when('has', { is: '2', then: Joi.required().messages(inputMessage("3", "기타 종류")) })
});

const customN5toN8Method = (value: any, helpers: Joi.CustomHelpers<any>) => {
  const { has, ...obj } = value;
  if (has === CancerPresence.무) return value;
  const hasData = Object.values(obj).some((value) => value === CancerPresence.유);
  if (!hasData) {
    return helpers.error("any.required");
  }

  return value;
}

const femaleCondition = ({ then, sibling }: { then: Joi.SchemaLike, sibling?: boolean }) => {
  return Joi.when(Joi.ref(sibling ? "sex" : "...sex"), {
    is: "F",
    then,
  })
}

const schema = Joi.object<CancerState>({
  sex: Joi.string().valid("M", "F").required(),
  n1: Joi.object<ICancerN1>({
    has: Joi.string().valid(...Object.values(CancerHas)).required().messages(selectMessage("1")),
    symptom: Joi.string().when("has", {
      is: CancerHas.예,
      then: Joi.required().messages(inputMessage("1", "증상"))
    })
  }).required().messages(selectMessage("1")),
  n2: Joi.object<ICancerN2>({
    has: Joi.string().valid(...Object.values(CancerWeight)).required().messages(selectMessage("2")),
    kg: Joi.number().when("has", {
      is: CancerWeight.체중감소,
      then: Joi.required().messages(inputMessage("2", "체중감소"))
    })
  }).required().messages(selectMessage("2")),
  n3: Joi.object<ICancerN3>({
    stomach: n3FamSchema.required().messages(selectMessage("3", "위암")),
    breast: n3FamSchema.required().messages(selectMessage("3", "유방암")),
    colon: n3FamSchema.required().messages(selectMessage("3", "대장암")),
    liver: n3FamSchema.required().messages(selectMessage("3", "간암")),
    cervical: n3FamSchema.required().messages(selectMessage("3", "자궁경부암")),
    lung: n3FamSchema.required().messages(selectMessage("3", "폐암")),
    etc: etcSchema.required().messages(selectMessage("3", "기타")),
  }).required().messages(selectMessage("3")),
  n4: Joi.object<ICancerN4>({
    weJoyung: Joi.string().valid("1", "2", "3", "4").required().messages(selectMessage("4", "위장조영검사")),
    weNesigyung: Joi.string().valid("1", "2", "3", "4").required().messages(selectMessage("4", "위내시경")),
    yubang: femaleCondition({
      then: Joi.string().valid("1", "2", "3", "4").required().messages(selectMessage("4", "유방촬영"))
    }),
    daejangJamhyul: Joi.string().valid("1", "2", "3", "4").required().messages(selectMessage("4", "분변잠혈반응검사")),
    daejangNesigyung: Joi.string().valid("1", "2", "3", "4").required().messages(selectMessage("4", "대장내시경")),
    jagungGyungbu: femaleCondition({
      then: Joi.string().valid("1", "2", "3", "4").required().messages(selectMessage("4", "자궁경부세포검사"))
    }),
    pyeHyungbuCT: Joi.string().valid("1", "2", "3", "4").required().messages(selectMessage("4", "흉부CT")),
    ganChoumpa: Joi.string().valid("1", "2", "3", "4").required().messages(selectMessage("4", "간초음파"))
  }).required().messages(selectMessage("4")),
  n5: Joi.object<ICancerN5>({
    has: Joi.string().valid("1", "2").required().messages(selectMessage("5")),
    wegueyang: Joi.string().default("1").valid("1", "2"),
    weyum: Joi.string().default("1").valid("1", "2"),
    jangsangpi: Joi.string().default("1").valid("1", "2"),
    weyongjong: Joi.string().default("1").valid("1", "2"),
    etc: Joi.string().default("1").valid("1", "2"),
  }).custom(customN5toN8Method).required().messages(selectMessage("5")),
  n6: Joi.object<ICancerN6>({
    has: Joi.string().valid("1", "2").required().messages(selectMessage("6")),
    daejangyongjong: Joi.string().default("1").valid("1", "2"),
    daejangyeom: Joi.string().default("1").valid("1", "2"),
    cron: Joi.string().default("1").valid("1", "2"),
    chijil: Joi.string().default("1").valid("1", "2"),
    etc: Joi.string().default("1").valid("1", "2"),
  }).custom(customN5toN8Method).required().messages(selectMessage("6")),
  n7: Joi.object<ICancerN7>({
    has: Joi.string().valid("1", "2").required().messages(selectMessage("7")),
    bGanyum: Joi.string().default("1").valid("1", "2"),
    mansungB: Joi.string().default("1").valid("1", "2"),
    mansungC: Joi.string().default("1").valid("1", "2"),
    gangyungbyun: Joi.string().default("1").valid("1", "2"),
    etc: Joi.string().default("1").valid("1", "2"),
  }).custom(customN5toN8Method).required().messages(selectMessage("7")),
  n8: Joi.object<ICancerN8>({
    has: Joi.string().valid("1", "2").required().messages(selectMessage("8")),
    mansungPye: Joi.string().default("1").valid("1", "2"),
    pyegulhack: Joi.string().default("1").valid("1", "2"),
    pyegyuljul: Joi.string().default("1").valid("1", "2"),
    ganjilPye: Joi.string().default("1").valid("1", "2"),
    jinpye: Joi.string().default("1").valid("1", "2"),
    etc: Joi.string().default("1").valid("1", "2"),
  }).custom(customN5toN8Method).required().messages(selectMessage("8")),
  n9: femaleCondition({
    sibling: true,
    then: Joi.object<ICancerN9>({
      has: Joi.string().required(),
      age: Joi.number().when("has", {
        is: CancerMensturation.n세,
        then: Joi.required().messages(inputMessage("9", "월경 시작 나이"))
      })
    }).required().messages(selectMessage("9")),
  }),
  n10: femaleCondition({
    sibling: true,
    then: Joi.when("n9.has", {
      is: CancerMensturation.n세,
      then: Joi.object<ICancerN10>({
        state: Joi.string().valid(...Object.values(CancerMensturationState)).required().messages(selectMessage("10")),
        age: Joi.number().when("state", {
          is: CancerMensturationState.폐경되었음,
          then: Joi.required().messages(inputMessage("10", "폐경연령")),
        })
      }).required(),
    }).messages(selectMessage("10")),
  }),
  n11: femaleCondition({
    sibling: true,
    then: Joi.when("n10.state", {
      is: CancerMensturationState.폐경되었음,
      then: Joi.string().valid("1", "2", "3", "4", "5").required().messages(selectMessage("11")),
    }),
  }),
  n12: femaleCondition({
    sibling: true,
    then: Joi.when("n9.has", {
      is: CancerMensturation.n세,
      then: Joi.string().valid("1", "2", "3").required().messages(selectMessage("12")),
    }),
  }),
  n13: femaleCondition({
    sibling: true,
    then: Joi.when("n12", {
      is: Joi.exist().valid("1", "2"),
      then: Joi.string().valid("1", "2", "3", "4").required().messages(selectMessage("13")),
      otherwise: Joi.forbidden()
    }),
  }),
  n14: femaleCondition({
    sibling: true, then: Joi.string().valid("1", "2", "3").required().messages(selectMessage("14")),
  }),
  n15: femaleCondition({
    sibling: true,
    then: Joi.when("n9.has", {
      is: CancerMensturation.n세,
      then: Joi.string().valid("1", "2", "3", "4").required().messages(selectMessage("15")),
    }),
  }),
});


