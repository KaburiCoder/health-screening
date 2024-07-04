import { axClient } from "@/lib/api/ax-client";
import { ReasonState } from "@/models/reason-state";
import { apiPaths } from "@/paths"

export async function deleteReason({ id }: { id: string }): Promise<ReasonState> {
  const res = await axClient.delete(apiPaths.clickdesk.reasonId(id));
  return res.data;
}