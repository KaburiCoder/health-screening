import Joi from "joi";
import { CancerHas, CancerHasTh, CancerPresence, CancerState, CancerWeight, ICancerHasFamily, ICancerN1, ICancerN2, ICancerN3, ICancerN4, ICancerN5, ICancerN6, ICancerN7, ICancerN8 } from "./cancer-store";
import { inputMessage, selectMessage } from "../lifestyle/joi-messages";

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

const customN5toN8Method = (value: any, helpers: Joi.CustomHelpers<any>) => {
  const { has, ...obj } = value;
  if (has === CancerPresence.무) return value;
  const hasData = Object.values(obj).some((value) => value === CancerPresence.유);
  if (!hasData) {
    return helpers.error("any.required");
  }

  return value;
}

export const cancerSchema = Joi.object<CancerState>({
  n1: Joi.object<ICancerN1>({
    has: Joi.string().valid(...Object.values(CancerHas ?? {})).required().messages(selectMessage("1")),
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
    etc: n3FamSchema.required().messages(selectMessage("3", "기타")),
  }).required().messages(selectMessage("3")),
  n4: Joi.object<ICancerN4>({
    weJoyeong: Joi.string().valid("1", "2", "3", "4").required().messages(selectMessage("4", "위장조영검사")),
    weNesigyung: Joi.string().valid("1", "2", "3", "4").required().messages(selectMessage("4", "위내시경")),
    daejangJamhyul: Joi.string().valid("1", "2", "3", "4").required().messages(selectMessage("4", "분변잠혈반응검사")),
    daejangNesigyung: Joi.string().valid("1", "2", "3", "4").required().messages(selectMessage("4", "대장내시경")),
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
});