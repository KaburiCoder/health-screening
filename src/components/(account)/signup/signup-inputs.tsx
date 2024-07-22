import { InputX } from "@/components/ui/input-x";
import { Signup } from "@/models/signup";
import { ErrorResult } from "@/shared/error-result";
import React from "react";

interface Props {
  validateError: ErrorResult<Signup> | undefined;
  onChangeUserId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeOrgName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeConfirmPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeManagerCode: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SignupInputs({
  validateError,
  onChangeUserId,
  onChangePassword,
  onChangeConfirmPassword,
  onChangeManagerCode,
  onChangeEmail,
  onChangeOrgName,
}: Props) {
  return (
    <>
      <InputX
        label="아이디"
        errorMessage={validateError?.error?.userId}
        onChange={onChangeUserId}
      />
      <InputX
        label="비밀번호"
        type="password"
        errorMessage={validateError?.error?.password}
        onChange={onChangePassword}
      />
      <InputX
        label="비밀번호 확인"
        type="password"
        errorMessage={validateError?.error?.confirmPassword}
        onChange={onChangeConfirmPassword}
      />
      <InputX
        label="기관 이름"
        errorMessage={validateError?.error?.orgName}
        onChange={onChangeOrgName}
      />
      <InputX
        label="이메일"
        type="email"
        errorMessage={validateError?.error?.email}
        onChange={onChangeEmail}
      />
      <InputX
        label="관리자 코드"
        description="클릭소프트 담당자만 알 수 있어요."
        variant="faded"
        type="password"
        errorMessage={
          validateError?.error?.confirmManagerCode ||
          validateError?.error?.managerCode
        }
        onChange={onChangeManagerCode}
      />
    </>
  );
}
