import { useSignout } from "@/lib/hooks/use-signout";
import { Button, Link } from "@nextui-org/react";
import React from "react";

export default function LogoutButton() {
  const { handleSignout } = useSignout();

  return (
    <Button
      type="button"
      color="primary"
      variant="flat"
      onClick={handleSignout}
    >
      로그아웃
    </Button>
  );
}
