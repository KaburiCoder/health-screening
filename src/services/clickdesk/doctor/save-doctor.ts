import { axClient } from "@/lib/api/ax-client";
import { apiPaths } from "@/paths"

export interface SaveDoctorResponse extends SaveDoctorArgs {
  id: string;
  userId: string;
}

export interface SaveDoctorArgs {
  seq: number,
  code: string,
  name: string,
  jinchalName: string,
  kwamokName: string,
}

export async function saveDoctor(doctor: SaveDoctorArgs): Promise<SaveDoctorResponse> {
  const res = await axClient.put(apiPaths.clickdesk.doctor, doctor);
  return res.data;
}