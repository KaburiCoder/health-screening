import { CustomRadioGroup } from "@/components/custom-radio-group";
import { DescriptionWrapper } from "@/components/description";
import { useCancerStore } from "@/stores/cancer/cancer-store";
import React from "react";
import { useCancerState } from "./_hooks/use-cancer-state";
import { QnErrorBox } from "../questionnaire/questionnaire-error-box";
import { cancerIds } from "@/lib/objects/cancer-obj";
import { useFocus } from "@/lib/hooks/use-focus";

export const CancerN12 = () => {
  const n12 = useCancerStore((state) => state.n12);
  const setN12 = useCancerStore((state) => state.setN12);
  const { hadMenarche: wasMenarche } = useCancerState();
  const { scrollToFocus } = useFocus();

  function handleChange(value: string): void {
    setN12(value);
    scrollToFocus(cancerIds.n13);
  }

  return (
    <QnErrorBox selectedKey="cancer" errorKeys={[cancerIds.n12]}>
      <DescriptionWrapper
        id={cancerIds.n12}
        headmark="12"
        text="자녀를 몇 명 출산하셨습니까?"
      >
        <CustomRadioGroup
          isDisabled={!wasMenarche}
          radioClassName="flex-1 xs:flex-none"
          row
          value={n12}
          onValueChange={handleChange}
          items={[
            ["1", "1명"],
            ["2", "2명이상"],
            ["3", "출산한 적 없음"],
          ]}
        />
      </DescriptionWrapper>
    </QnErrorBox>
  );
};
