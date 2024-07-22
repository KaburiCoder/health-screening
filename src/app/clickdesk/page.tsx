import { ClickDeskBody } from "@/components/(clickdesk)/root/click-desk-body";
import { paths } from "@/paths";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: {
    id?: string;
    pw?: string;
  };
}
const ClickDeskPage = ({ searchParams: { id, pw } }: Props) => {
  if (!id || !pw) {
    redirect(paths.login);
  }

  return <ClickDeskBody id={id} pw={pw} />;
};

export default ClickDeskPage;
