import { paths } from "@/paths"
import { axClient } from "../../lib/api/ax-client";

export async function getLockPw(): Promise<{ lockPw: string }> {
  const res = await axClient.get(paths.settings('lockpw'))
  return res.data;
}