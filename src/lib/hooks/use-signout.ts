import { useRouter } from "next/navigation";
import { signout } from "../api/signout";
import { paths } from "@/paths";

export const useSignout = () => {
  const { replace } = useRouter();

  function handleSignout(): void {
    signout().then(() => replace(paths.login));
  }

  return { handleSignout }
}