import { axClient } from "@/lib/api/ax-client";
import { ReasonState } from "@/models/reason-state";
import { apiPaths } from "@/paths"

export async function saveReason({ text }: { text: string }): Promise<ReasonState> {
  const res = await axClient.post(apiPaths.clickdesk.reason, { text });
  return res.data;
}