import SignupBody from "@/components/(account)/signup/signup-body";
import { unstable_noStore as noStore } from "next/cache";

export default async function SignupPage() {
  noStore();
  return <SignupBody />;
}
