'use server'
import { apiPaths, paths } from "@/paths";
import Joi from "joi";
import { ActionResultBase } from "./common/action-result-base";
import { catchActionApi } from "./common/catch-action-api";
import { axServer } from "../api/ax-server";
import { revalidatePath } from "next/cache";

interface SaveManagerCodeDto {
  managerCode: string;
}

const schema = Joi.object<SaveManagerCodeDto>({
  managerCode: Joi.string().required().messages({ "string.empty": "코드를 입력하세요." }),
})

export interface SaveManagerCodeResult extends ActionResultBase<boolean, Partial<SaveManagerCodeDto>> { }

export async function saveManagerCode(_: SaveManagerCodeResult, formData: FormData): Promise<SaveManagerCodeResult> {
  const { error, value } = schema.validate({ managerCode: formData.get("managerCode") });
  const result = await catchActionApi(error, () => axServer().post(apiPaths.adminSettings, {
    managerCode: value.managerCode
  }));

  if (result.status === 'error') return result;

  revalidatePath(paths.adminSettings("common"))
  return { status: 'success' }
}

