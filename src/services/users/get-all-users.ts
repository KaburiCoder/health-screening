import { axClient } from "@/lib/api/ax-client";
import { User } from "@/models/user";
import { apiPaths } from "@/paths";

export async function getAllUsers(): Promise<User[]> {
  const response = await axClient.get(apiPaths.users.root);

  return response.data?.users as User[];
}