"use client";
import ErrorBox from "@/components/error-box";
import ButtonL from "@/components/ui/button-l";
import { InputX } from "@/components/ui/input-x";
import { changeEmail } from "@/lib/actions/change-email";
import { useServerCookie } from "@/lib/hooks/use-server-cookie";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

export const ChangeEmailInputs = () => {
  const [email, setEmail] = useState("");
  const [state, action] = useFormState(changeEmail, {});
  const { user } = useServerCookie({ deps: [state] });

  useEffect(() => {
    setEmail(user?.email ?? "");
  }, [user]);

  useEffect(() => {
    if (state.status === "success") toast.success("변경되었습니다.");
  }, [state]);

  return (
    <form className="flex flex-1 flex-col gap-2" action={action}>
      <InputX
        name="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={state.errors?.email}
      />
      <ErrorBox errorMessage={state.errors?._form} />
      <ButtonL disabled={email.toLowerCase() === user?.email.toLowerCase()}>
        변경
      </ButtonL>
    </form>
  );
};
