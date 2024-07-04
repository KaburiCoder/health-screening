import { axClient } from "@/lib/api/ax-client";
import { ReasonState } from "@/models/reason-state";
import { apiPaths } from "@/paths";

export async function updateAllReasons(args: { reasons: ReasonState[] }): Promise<boolean> {
  const res = await axClient.patch(apiPaths.clickdesk.reasonAll, args);
  return res.data;
}