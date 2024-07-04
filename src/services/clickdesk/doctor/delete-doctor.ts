import { axClient } from "@/lib/api/ax-client";
import { DoctorState } from "@/models/doctor-state";
import { apiPaths } from "@/paths"

interface DeleteDoctorArgs {
  code: string;
}

export async function deleteDoctor({ code }: DeleteDoctorArgs): Promise<DoctorState> {
  const res = await axClient.delete(apiPaths.clickdesk.doctor, { data: { code } });
  return res.data;
}