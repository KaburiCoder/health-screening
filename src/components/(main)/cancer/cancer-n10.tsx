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
import { QnErrorBox } from "../questionnaire/questionnaire-error-box";
import { cancerIds } from "@/lib/objects/cancer-obj";
import { useFocus } from "@/lib/hooks/use-focus";

export const CancerN10 = () => {
  const n10 = useCancerStore((state) => state.n10);
  const setN10State = useCancerStore((state) => state.setN10State);
  const setN10Age = useCancerStore((state) => state.setN10Age);
  const isMenopause = useCancerStore((state) => state.isMenopause);
  const { hadMenarche: wasMenarche } = useCancerState();
  const { conditions, scrollToFocus, focusDelay, setNumValueTrg } = useFocus();

  function handleChange(value: string): void {
    const state = value as CancerMensturationState;
    setN10State(state);
    if (state === CancerMensturationState.폐경되었음) {
      return focusDelay(cancerIds["n10.age"]);
    }
    return scrollToFocus(cancerIds.n12);
  }

  function onAgeChange(value: number | undefined): void {
    setNumValueTrg(
      n10?.age,
      setN10Age,
      {
        blur: { id: cancerIds["n10.age"] },
        scroll: { id: cancerIds.n11, condition: conditions.twoDigit },
      },
      value,
    );
  }

  return (
    <QnErrorBox
      selectedKey="cancer"
      errorKeys={[cancerIds.n10, cancerIds["n10.age"]]}
    >
      <DescriptionWrapper
        id={cancerIds.n10}
        headmark="10"
        text="현재 월경의 상태는 어떠십니까?"
      >
        <div className="flex flex-col flex-wrap gap-2 gap-x-4 xs:flex-row">
          <CustomRadioGroup
            isDisabled={!wasMenarche}
            radioClassName="flex-1 xs:flex-none"
            row
            value={n10?.state}
            onValueChange={handleChange}
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
              id={cancerIds["n10.age"]}
              value={n10?.age}
              onChange={onAgeChange}
              className="h-full min-w-10 max-w-20"
            />
          </LabelWrapper>
        </div>
      </DescriptionWrapper>
    </QnErrorBox>
  );
};
