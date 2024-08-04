import { axClient } from "@/lib/api/ax-client";
import { User } from "@/models/user";
import { UserSettings } from "@/models/user-settings";
import { apiPaths } from "@/paths";

interface UpdateUserDto {
  id: string;
  data: {
    orgName: string;
    email: string;
    settings?: UserSettings;
  }
}

export async function updateUser({ id, data }: UpdateUserDto): Promise<User> {
  const response = await axClient.patch(apiPaths.users.update(id), data);

  return response.data as User;
}