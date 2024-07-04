import { axClient } from "@/lib/api/ax-client";
import { paths } from "@/paths";
import * as UserCookie from "@/server/cookies/user-cookie";

export async function signout() {
  await UserCookie.deleteUser();
  return axClient.post(paths.signout);
}
