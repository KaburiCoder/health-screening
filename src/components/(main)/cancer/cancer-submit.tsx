import { Button } from "@nextui-org/react";
import React from "react";
import { useCancerStore } from "@/stores/cancer/cancer-store";
import { flattenJoiError } from "health-screening-shared/joi";
import { useErrorStore } from "@/stores/error-store";
import { useFocus } from "@/lib/hooks/use-focus";
import { EvPaths } from "@/socket-io/ev-paths";
import { useEmitX } from "@/lib/hooks/use-emit-x";
import ErrorBox from "@/components/error-box";

export const CancerSubmit = () => {
  const validate = useCancerStore((state) => state.validate);
  const { scrollToError } = useFocus();
  const { setError } = useErrorStore();

  const { error, isLoading, emitAck } = useEmitX({
    ev: EvPaths.SaveCancer,
    onSuccess: (data) => {
      console.log("data", data);
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
    <div className="fixed right-20 top-20 w-44">
      <Button isLoading={isLoading} onClick={handleClick}>
        확인
      </Button>
      <ErrorBox errorMessage={error?.message} />
    </div>
  );
};
