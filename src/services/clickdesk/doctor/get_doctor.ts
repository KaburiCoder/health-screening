import { axClient } from "@/lib/api/ax-client";
import { DoctorState } from "@/models/doctor-state";
import { apiPaths } from "@/paths"

export async function getDoctor(id: string): Promise<DoctorState> {
  const res = await axClient.get(apiPaths.clickdesk.doctorId(id));
  return res.data;
}