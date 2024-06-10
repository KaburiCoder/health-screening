import { CustomRadioGroup } from "@/components/custom-radio-group";
import { DescriptionWrapper } from "@/components/description";
import LabelWrapper from "@/components/label-wrapper";
import { NumInput } from "@/components/num-input";
import {
  CancerMensturation,
  useCancerStore,
} from "@/stores/cancer/cancer-store";
import { cn } from "@nextui-org/react";
import React from "react";

export const CancerN9 = () => {
  const n9 = useCancerStore((state) => state.n9);
  const setN9Has = useCancerStore((state) => state.setN9Has);
  const setN9Age = useCancerStore((state) => state.setN9Age);

  return (
    <DescriptionWrapper headmark="9" text="월경을 언제 시작하셨습니까?">
      <div className="flex flex-col gap-2 gap-x-4 xs:flex-row">
        <CustomRadioGroup
          radioClassName="flex-1 xs:flex-none"
          row
          value={n9?.has}
          onValueChange={(v) => setN9Has(v as CancerMensturation)}
          items={[
            ["1", "*세"],
            ["2", "초경이 없었음"],
          ]}
        />
        <LabelWrapper
          className={cn(
            "flex-1",
            n9?.has !== CancerMensturation.n세 ? "hidden" : "",
          )}
          start="("
          end=")세"
        >
          <NumInput
            id="abc"
            value={n9?.age}
            onChange={setN9Age}
            className="h-full max-w-20"
          />
        </LabelWrapper>
      </div>
    </DescriptionWrapper>
  );
};
