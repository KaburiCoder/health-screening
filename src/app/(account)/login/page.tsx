"use client";
import { Input, Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import AccountHero from "../account-hero";
import { paths } from "@/paths";
import { AxiosError } from "axios";
import { axClient } from "@/lib/api/ax-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signin } from "@/lib/api/signin";
import { useValidate } from "@/lib/hooks/use-validate";
import { Signin, signinSchema } from "@/models/signin";
import ErrorBox from "@/components/error-box";
import { Button } from "@/components/ui/button";
import ButtonL from "@/components/ui/button-l";

export default function LoginPage() {
  const { replace } = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutate, isPending, error } = useMutation({
    mutationKey: [paths.signin],
    mutationFn: signin,
    onSuccess: (data) => {
      if (data?.status === 201) replace(paths.root);
    },
  });
  const { validateError, validate } = useValidate<Signin, Signin>({ error });

  async function handleSignin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data: Signin = { userId, password };
    if (validate(signinSchema, data)) {
      mutate(data);
    }
  }

  return (
    <AccountHero
      onSubmit={handleSignin}
      title="Sign in to ClickSoft"
      formIn={
        <>
          <Input
            label="아이디"
            labelPlacement={"outside"}
            placeholder="Enter your ID"
            errorMessage={validateError?.error?.userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Input
            label="비밀번호"
            labelPlacement={"outside"}
            placeholder="Enter your password"
            type="password"
            errorMessage={validateError?.error?.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ErrorBox errorMessage={validateError?.error?._form} />

          <ButtonL
            type="submit"
            className="text-white"
            color="success"
            variant={"default"}
            isLoading={isPending}
          >
            로그인
          </ButtonL>
        </>
      }
      bottomIn={
        <>
          <Link
            className="text-center  font-bold text-blue-500"
            href={paths.findPw}
          >
            비밀번호 찾기
          </Link>
          <div className="space-x-2">
            <span>처음이신가요?</span>
            <Link className="text-center text-blue-500" href={paths.signup}>
              회원가입
            </Link>
          </div>
        </>
      }
    />
  );
}
