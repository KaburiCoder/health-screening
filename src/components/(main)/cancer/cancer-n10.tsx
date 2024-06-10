import { CustomRadioGroup } from "@/components/custom-radio-group";
import { DescriptionWrapper } from "@/components/description";
import LabelWrapper from "@/components/label-wrapper";
import { NumInput } from "@/components/num-input";
import {
  CancerMensturationState,
  useCancerStore,
} from "@/stores/cancer/cancer-store";
import { cn } from "@nextui-org/react";
import React from "react";
import { useCancerState } from "./_hooks/use-cancer-state";

export const CancerN10 = () => {
  const n10 = useCancerStore((state) => state.n10);
  const setN10State = useCancerStore((state) => state.setN10State);
  const setN10Age = useCancerStore((state) => state.setN10Age);
  const isMenopause = useCancerStore((state) => state.isMenopause);
  const { hadMenarche: wasMenarche } = useCancerState();

  return (
    <DescriptionWrapper headmark="10" text="현재 월경의 상태는 어떠십니까?">
      <div className="flex flex-col flex-wrap gap-2 gap-x-4 xs:flex-row">
        <CustomRadioGroup
          isDisabled={!wasMenarche}
          radioClassName="flex-1 xs:flex-none"
          row
          value={n10?.state}
          onValueChange={(v) => setN10State(v as CancerMensturationState)}
          items={[
            ["1", "아직 월경이 있음"],
            ["2", "자궁적출술을 하였음"],
            ["3", "폐경되었음"],
            ["4", "병력으로 월경하지 않음"],
          ]}
        />
        <LabelWrapper
          className={cn("flex-1", !isMenopause() ? "hidden" : "")}
          start="(폐경연령"
          end=")세"
        >
          <NumInput
            id="abc"
            value={n10?.age}
            onChange={setN10Age}
            className="h-full min-w-10 max-w-20"
          />
        </LabelWrapper>
      </div>
    </DescriptionWrapper>
  );
};
