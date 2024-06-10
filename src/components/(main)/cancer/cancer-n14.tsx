import { CustomRadioGroup } from "@/components/custom-radio-group";
import { DescriptionWrapper } from "@/components/description";
import { useCancerStore } from "@/stores/cancer/cancer-store";
import React from "react";

export const CancerN14 = () => {
  const n14 = useCancerStore((state) => state.n14);
  const setN14 = useCancerStore((state) => state.setN14);

  return (
    <DescriptionWrapper headmark="14" text="과거에 유방에 양성 종양으로 진단받은 적이 있습니까?">
      <CustomRadioGroup
        radioClassName="flex-1 xs:flex-none"
        row
        value={n14}
        onValueChange={setN14}
        items={[
          ["1", "예"],
          ["2", "아니오"],
          ["3", "모르겠음"],
        ]}
      />
    </DescriptionWrapper>
  );
};
