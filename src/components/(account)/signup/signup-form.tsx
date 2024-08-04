import React from "react";
import { useSignupState } from "./_hooks/use-signup-state";
import { useFetchSignup } from "./_hooks/use-fetch-signup";
import SignupInputs from "./signup-inputs";
import ButtonL from "@/components/ui/button-l";
import AccountBaseForm from "../account-base-form";

export default function SignupForm() {
  const {
    userId,
    password,
    confirmPassword,
    email,
    orgName,
    handleChangeUserId,
    handleChangePassword,
    handleChangeConfirmPassword,
    handleChangeEmail,
    handleChangeOrgName,
  } = useSignupState();
  const { isPending, validateError, handleSignup } = useFetchSignup();

  return (
    <AccountBaseForm
      onSubmit={handleSignup.bind(null, {
        userId,
        password,
        confirmPassword,
        email,
        orgName,
      })}
    >
      <SignupInputs
        validateError={validateError}
        onChangeUserId={handleChangeUserId}
        onChangePassword={handleChangePassword}
        onChangeConfirmPassword={handleChangeConfirmPassword}
        onChangeEmail={handleChangeEmail}
        onChangeOrgName={handleChangeOrgName}
      />
      <ButtonL
        className="mt-4 text-white"
        type="submit"
        color="success"
        isLoading={isPending}
      >
        회원가입
      </ButtonL>
    </AccountBaseForm>
  );
}
