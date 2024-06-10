import { CustomRadioGroup } from "@/components/custom-radio-group";
import { DescriptionWrapper } from "@/components/description";
import { useCancerStore } from "@/stores/cancer/cancer-store";
import React from "react";
import { useCancerState } from "./_hooks/use-cancer-state";

export const CancerN15 = () => {
  const n15 = useCancerStore((state) => state.n15);
  const setN15 = useCancerStore((state) => state.setN15);
  const { hadMenarche: wasMenarche } = useCancerState();

  return (
    <DescriptionWrapper
      headmark="15"
      text="피임약을 복용하고 계시거나 과거에 복용하신 적이 있습니까?"
    >
      <CustomRadioGroup
        isDisabled={!wasMenarche}
        radioClassName="flex-1 xs:flex-none"
        row
        value={n15}
        onValueChange={setN15}
        items={[
          ["1", "피임약을 복용한 적 없음"],
          ["2", "1년미만 복용"],
          ["3", "1년이상 복용"],
          ["4", "모르겠음"],
        ]}
      />
    </DescriptionWrapper>
  );
};
