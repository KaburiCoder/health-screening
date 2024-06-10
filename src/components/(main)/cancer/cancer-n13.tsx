import { CustomRadioGroup } from "@/components/custom-radio-group";
import { DescriptionWrapper } from "@/components/description";
import {
  useCancerStore,
} from "@/stores/cancer/cancer-store";
import React from "react";
import { useCancerState } from "./_hooks/use-cancer-state";

export const CancerN13 = () => {
  const n13 = useCancerStore((state) => state.n13);
  const setN13 = useCancerStore((state) => state.setN13);
  const { givenBirth } = useCancerState();

  return (
    <DescriptionWrapper headmark="13" text="모유 수유 여부 및 총 수유기간은?">
      <CustomRadioGroup
        isDisabled={!givenBirth}
        radioClassName="flex-1 xs:flex-none"
        row
        value={n13}
        onValueChange={setN13}
        items={[
          ["1", "6개월미만"],
          ["2", "6개월~1년미만"],
          ["3", "1년이상"],
          ["4", "수유한적 없음"],
        ]}
      />
    </DescriptionWrapper>
  );
};
