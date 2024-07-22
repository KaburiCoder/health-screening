"use client";
import { LottieLoading } from "@/components/lottie/lottie-loading";
import { LottieWarning } from "@/components/lottie/lottie-warning";
import { paths } from "@/paths";
import { signin } from "@/services/sign/signin";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  id: string;
  pw: string;
}
export const ClickDeskBody = ({ id, pw }: Props) => {
  const { replace } = useRouter();
  const { isSuccess, isPending, isError } = useQuery({
    queryFn: () => signin({ userId: id, password: pw }),
    queryKey: [id, pw],
  });

  useEffect(() => {
    window.history.replaceState({}, "", paths.clickdesk.root);
  }, []);

  useEffect(() => {
    if (isSuccess) replace(paths.clickdesk.reception("hospinfo"));
  }, [isSuccess]);

  return (
    <div className="flex-center" style={{ height: "80vh" }}>
      {isPending && (
        <LottieBox
          lottie={<LottieLoading />}
          texts={["계정 권한을 확인하는 중 입니다."]}
        />
      )}
      {isError && (
        <LottieBox
          lottie={<LottieWarning loop={false} />}
          texts={[
            "계정 권한이 없습니다.",
            "아이디 혹은 비밀번호를 확인하세요!",
          ]}
        />
      )}
    </div>
  );
};

const LottieBox = ({
  lottie,
  texts,
}: {
  lottie: React.ReactNode;
  texts: string[];
}) => {
  return (
    <div className="flex flex-col items-center">
      {lottie}
      {texts.map((text, i) => (
        <p key={i} className="text-2xl font-bold text-amber-500">
          {text}
        </p>
      ))}
    </div>
  );
};
