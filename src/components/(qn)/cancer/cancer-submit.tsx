import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useCancerStore } from "@/stores/cancer/cancer-store";
import { flattenJoiError } from "health-screening-shared/joi";
import { useErrorStore } from "@/stores/error-store";
import { useFocus } from "@/lib/hooks/use-focus";
import { EvPaths } from "@/socket-io/ev-paths";
import { useEmitX } from "@/lib/hooks/use-emit-x";
import ErrorBox from "@/components/ErrorBox";
import { SocketResponse } from "@/lib/types/socket-response";
import { useRouter } from "next/navigation";
import { paths } from "@/shared/paths";
import LsNextButtons from "../lifestyle/ls-next-buttons";
import toast from "react-hot-toast";

export const CancerSubmit = () => {
  const { push } = useRouter();
  const { scrollToError } = useFocus();
  const { setError } = useErrorStore();
  const validate = useCancerStore((state) => state.validate);

  const { isLoading, emitAck } = useEmitX<any, SocketResponse<any>>({
    ev: EvPaths.SaveCancer,
    onSuccess: ({ status }) => {
      if (status === "success") {
        push(paths.success("암 문진표"));
      }
    },
  });

  async function handleClick() {
    const { error, value } = validate();
    if (error) {
      const flattenError = flattenJoiError(error);
      setError("cancer", flattenError);

      const firstKey = Object.keys(flattenError)[0];
      // 화면에 에러 박스로 표시할 수 있는 항목이면 해당 위치로 스크롤하고,
      // 그렇지 못한 항목(예: sex처럼 입력 UI가 없는 필드)은 toast로 노출해
      // 클릭 시 아무 반응이 없는(무반응) 상황을 방지한다.
      if (document.getElementById(firstKey)) {
        return scrollToError(firstKey);
      }
      return void toast.error(flattenError[firstKey]);
    }

    setError("cancer", undefined);
    await emitAck(value);
  }

  return (
    <LsNextButtons
      isLoading={isLoading}
      index={0}
      lastIndex={0}
      onNext={handleClick}
    />
  );
};
