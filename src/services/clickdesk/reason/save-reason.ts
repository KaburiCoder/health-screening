import { axClient } from "@/lib/api/ax-client";
import { ReasonState } from "@/models/reason-state";
import { apiPaths } from "@/paths"

export interface SaveReasonArgs {
  text: string;
  useNHISHealthCheckUp: boolean;
}

export async function saveReason(args: SaveReasonArgs): Promise<ReasonState> {
  const res = await axClient.post(apiPaths.clickdesk.reason, args);
  return res.data;
}