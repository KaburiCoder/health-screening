import { CustomRadioGroup } from "@/components/custom-radio-group";
import { DescriptionWrapper } from "@/components/description";
import { useCancerStore } from "@/stores/cancer/cancer-store";
import React from "react";
import { useCancerState } from "./_hooks/use-cancer-state";

export const CancerN12 = () => {
  const n12 = useCancerStore((state) => state.n12);
  const setN12 = useCancerStore((state) => state.setN12);
  const { hadMenarche: wasMenarche } = useCancerState();

  return (
    <DescriptionWrapper headmark="12" text="자녀를 몇 명 출산하셨습니까?">
      <CustomRadioGroup
        isDisabled={!wasMenarche}
        radioClassName="flex-1 xs:flex-none"
        row
        value={n12}
        onValueChange={setN12}
        items={[
          ["1", "1명"],
          ["2", "2명이상"],
          ["3", "출산한 적 없음"],
        ]}
      />
    </DescriptionWrapper>
  );
};
