import SignupBody from "@/components/(account)/signup/signup-body";
import { getAdminSettings } from "@/lib/api/server/get-admin-settings";
import { unstable_noStore as noStore } from "next/cache";

export default async function SignupPage() {
  noStore();
  const { managerCode } = await getAdminSettings("managerCode");
  return <SignupBody managerCode={managerCode} />;
}
