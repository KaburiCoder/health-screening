import { CustomRadioGroup } from "@/components/custom-radio-group";
import { DescriptionWrapper } from "@/components/description";
import LabelWrapper from "@/components/label-wrapper";
import { NumInput } from "@/components/num-input";
import { CancerWeight, useCancerStore } from "@/stores/cancer/cancer-store";
import { Input, cn } from "@nextui-org/react";
import React from "react";

export default function CancerN2() {
  const n2 = useCancerStore((state) => state.n2);
  const setN2Has = useCancerStore((state) => state.setN2Has);
  const setN2Kg = useCancerStore((state) => state.setN2Kg);

  return (
    <DescriptionWrapper
      id={""}
      headmark={"2"}
      text={"지난 6개월 간 특별한 이유 없이 5Kg 이상의 체중감소가 있었습니까?"}
    >
      <div className="flex flex-col gap-2 gap-x-4 xs:flex-row">
        <CustomRadioGroup
          radioClassName="flex-1 xs:flex-none"
          row
          // isDisabled={isDisabled}
          value={n2?.has}
          onValueChange={(v) => setN2Has(v as CancerWeight)}
          items={[
            ["2", "예"],
            ["1", "아니오"],
          ]}
        />
        <LabelWrapper
          className={cn(
            "flex-1",
            n2?.has !== CancerWeight.체중감소 ? "hidden" : "",
          )}
          start="체중감소("
          end=")Kg"
        >
          <NumInput
            id="abc"
            value={n2?.kg}
            onChange={setN2Kg}
            className="h-full max-w-20"
          />
        </LabelWrapper>
      </div>
    </DescriptionWrapper>
  );
}
