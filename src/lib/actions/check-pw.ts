'use server'
import { axClient } from "@/lib/api/ax-client";
import { apiPaths, paths } from "@/paths";
import { getUser } from "@/server/cookies/user-cookie";
import { AxiosError } from "axios";
import { flattenJoiError } from "health-screening-shared/joi";
import Joi from "joi";
import { ActionResultBase } from "./common/action-result-base";
import { catchActionApi } from "./common/catch-action-api";
import { axServer } from "../api/ax-server";

interface CheckPwDto {
  password: string;
}

const schema = Joi.object<CheckPwDto>({
  password: Joi.string().required().messages({ "string.empty": "비밀번호를 입력하세요." }),
})

interface CheckPwResult extends ActionResultBase<boolean, Partial<CheckPwDto>> { }

export async function checkPw(state: CheckPwResult, formData: FormData): Promise<CheckPwResult> {
  const { error, value } = schema.validate(Object.fromEntries(formData))
  const user = await getUser();
  if (error) {
    return { status: 'error', errors: flattenJoiError(error) };
  }
  const path = apiPaths.users.checkpw(user!.userId);
  const result = await catchActionApi(error, () => axServer().post(path, {
    password: value.password,
  }));

  if (result.status === 'error') return result;

  return { status: 'success' }
}

