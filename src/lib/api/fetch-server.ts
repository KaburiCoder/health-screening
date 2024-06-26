import { User } from "@/models/user";
import { getServerHeaders } from "./get-server-headers";

export async function fetchCurrentUser(): Promise<User | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/currentuser`,
      {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: getServerHeaders(),
      },
    );

    if (res.status === 200) {
      return (await res.json()).currentUser;
    }
  } catch (error) {}
  return;
}
