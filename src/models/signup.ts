import Joi from "joi";

export interface Signup {
  userId: string;
  password: string;
  email: string;
  orgName: string;
  confirmPassword?: string;
  managerCode: string;
  confirmManagerCode: string;
}

export const signupSchema = Joi.object<Signup>({
  userId: Joi.string().trim().required().messages({
    "string.empty": `아이디를 입력하세요.`,
  }),
  password: Joi.string().required().messages({
    "string.empty": `비밀번호를 입력하세요.`,
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": `이메일을 입력하세요.`,
    "string.email": `올바른 이메일 형식이 아닙니다.`,
  }),
  orgName: Joi.string().required().messages({
    "string.empty": `기관이름을 입력하세요.`,
  }),
  managerCode: Joi.string().required().messages({
    "string.empty": `관리자 코드를 입력하세요.`,
  }),
  confirmManagerCode: Joi.string().required().valid(Joi.ref("managerCode")).messages({
    "any.only": `관리자코드가 일치하지 않습니다.`,
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": `비밀번호 확인란을 입력하세요.`,
    "any.only": `비밀번호와 일치하지 않습니다.`,
  }),
}).options({ abortEarly: false });
