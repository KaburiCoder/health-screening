import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useCancerState } from "./_hooks/use-cancer-state";
import { useCancerStore } from "@/stores/cancer/cancer-store";
import { flattenJoiError } from "health-screening-shared/joi";

export const CancerSubmit = () => {
  const validate = useCancerStore((state) => state.validate);
  const [error, setError] = useState("");
  return (
    <div className="fixed right-20 top-20 w-44">
      <Button
        onClick={() => {
          const { error, value } = validate();
          if (error) {
            const flattenError = flattenJoiError(error);

            setError(JSON.stringify(flattenError));
          } else {
            setError("");
          }
        }}
      >
        CancerSubmit
      </Button>

      <div className="border bg-gray-50">{error}</div>
    </div>
  );
};
