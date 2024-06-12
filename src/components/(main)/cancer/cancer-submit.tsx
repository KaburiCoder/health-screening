import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useCancerStore } from "@/stores/cancer/cancer-store";
import { flattenJoiError } from "health-screening-shared/joi";
import { useErrorStore } from "@/stores/error-store";
import { useFocus } from "@/lib/hooks/use-focus";
import { EvPaths } from "@/socket-io/ev-paths";
import { useEmitX } from "@/lib/hooks/use-emit-x";
import ErrorBox from "@/components/error-box";
import { SocketResponse } from "@/lib/types/socket-response";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
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
      return scrollToError(Object.keys(flattenError)[0]);
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
