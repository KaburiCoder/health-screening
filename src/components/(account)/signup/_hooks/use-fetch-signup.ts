import { signup } from '@/services/sign/signup';
import { useValidate } from '@/lib/hooks/use-validate';
import { Signup, signupSchema } from '@/models/signup';
import { paths } from '@/paths';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react'

export const useFetchSignup = () => {
  const { push } = useRouter();
  const { mutate, isPending, error } = useMutation({
    mutationKey: [paths.signup],
    mutationFn: signup,
    onSuccess(data) {
      if (data?.status === 201) push(paths.login);
    },
  });
  const { validateError, validateAndGetResult } = useValidate<Signup, Signup>({
    error,
  });

  async function handleSignup({ confirmPassword, ...data }: Signup, e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      validateAndGetResult(signupSchema, {
        ...data,
        confirmPassword,
      })
    ) {
      mutate(data);
    }
  }

  return {
    isPending,
    validateError,
    handleSignup,
  }
}
