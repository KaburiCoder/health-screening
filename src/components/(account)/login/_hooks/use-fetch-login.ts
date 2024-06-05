import { useMutation } from "@tanstack/react-query";
import { paths } from "@/paths";
import { signin } from "@/lib/api/signin";
import { useValidate } from "@/lib/hooks/use-validate";
import React from 'react'
import { useRouter } from "next/navigation";
import { Signin, signinSchema } from "@/models/signin";

export const useFetchLogin = () => {
  const { replace } = useRouter();
  const { mutate, isPending, error } = useMutation({
    mutationKey: [paths.signin],
    mutationFn: signin,
    onSuccess: (response) => {
      if (response?.status === 200) {
        const data = response.data;
        replace(data.admin ? paths.adminSettings("common") : paths.root);
      }
    },
  });
  const { validateError, validateAndGetResult } = useValidate<Signin, Signin>({
    error,
  });

  console.log(error);

  async function handleSignin(data: Signin, event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validateAndGetResult(signinSchema, data)) {
      mutate(data);
    }
  }

  return {
    isPending,
    validateError,
    handleSignin
  }
}
