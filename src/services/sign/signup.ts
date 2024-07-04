import { axClient } from "@/lib/api/ax-client";
import { paths } from "@/paths";

export async function signup(dto: {
  userId: string;
  password: string;
  roomKey: string;
  managerCode: string;
  orgName: string;
  email: string;
}) {
  return await axClient.post(paths.signup, dto);
}
