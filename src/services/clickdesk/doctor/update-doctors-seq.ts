import { axClient } from "@/lib/api/ax-client";
import { apiPaths } from "@/paths"

export interface UpdateDoctorsSeqResponse {
  id: string;
  userId: string;
}

export interface UpdateDoctorsSeqArgs {
  codes: {
    code: string;
    seq: number;
  }[]
}

export async function updateDoctorsSeq(args: UpdateDoctorsSeqArgs): Promise<UpdateDoctorsSeqResponse> {
  const res = await axClient.patch(apiPaths.clickdesk.doctorSeq, args);
  return res.data;
}