import { axClient } from "@/lib/api/ax-client";
import { DoctorState, DoctorWorks } from "@/models/doctor-state";
import { apiPaths } from "@/paths"

export interface UpdateDoctorResponse {
  id: string;
  userId: string;
}

export interface UpdateDoctorArgs {
  id: string;
  name?: string;
  jinchalName?: string;
  kwamokName?: string;
  works?: DoctorWorks;
}
export async function updateDoctor({ id, ...data }: UpdateDoctorArgs): Promise<DoctorState> {
  const res = await axClient.patch(apiPaths.clickdesk.doctorUpdate(id), data);
  return res.data;
}