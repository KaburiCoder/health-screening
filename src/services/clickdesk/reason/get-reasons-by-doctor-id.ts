import { axClient } from "@/lib/api/ax-client";
import { ReasonState } from "@/models/reason-state";
import { apiPaths } from "@/paths"

export async function getReasonsByDoctorId(doctorId: string): Promise<ReasonState[]> {
  const res = await axClient.get(apiPaths.clickdesk.reasonWithDoctorId(doctorId));
  return res.data;
}