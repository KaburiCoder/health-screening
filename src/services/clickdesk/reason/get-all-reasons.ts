import { axClient } from "@/lib/api/ax-client";
import { ReasonState } from "@/models/reason-state";
import { apiPaths } from "@/paths"

export async function getAllReasons(): Promise<ReasonState[]> {
  const res = await axClient.get(apiPaths.clickdesk.reason);
  return res.data;
}