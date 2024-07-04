import { axClient } from "@/lib/api/ax-client";
import { ReasonState } from "@/models/reason-state";
import { apiPaths } from "@/paths";

export async function updateReason(args: ReasonState): Promise<boolean> {
  const res = await axClient.patch(apiPaths.clickdesk.reasonUpdate(args.id), args);
  return res.data;
}