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
import { QnErrorBox } from "../questionnaire/questionnaire-error-box";
import { cancerIds } from "@/lib/objects/cancer-obj";
import { useFocus } from "../../../lib/hooks/use-focus";

export const CancerN9 = () => {
  const n9 = useCancerStore((state) => state.n9);
  const setN9Has = useCancerStore((state) => state.setN9Has);
  const setN9Age = useCancerStore((state) => state.setN9Age);
  const { conditions, scrollToFocus, focusDelay, setNumValueTrg } = useFocus();

  function handleChange(value: string): void {
    const has = value as CancerMensturation;
    setN9Has(has);
    if (has === CancerMensturation.n세) {
      return focusDelay(cancerIds["n9.age"]);
    }
    return scrollToFocus(cancerIds.n14);
  }

  function onAgeChange(value: number | undefined): void {
    setN9Age(value);
    setNumValueTrg(
      n9?.age,
      setN9Age,
      {
        blur: { id: cancerIds["n9.age"] },
        scroll: { id: cancerIds.n10, condition: conditions.twoDigit },
      },
      value,
    );
  }

  return (
    <QnErrorBox
      selectedKey="cancer"
      errorKeys={[cancerIds.n9, cancerIds["n9.age"]]}
    >
      <DescriptionWrapper
        id={cancerIds.n9}
        headmark="9"
        text="월경을 언제 시작하셨습니까?"
      >
        <div className="flex flex-col gap-2 gap-x-4 xs:flex-row">
          <CustomRadioGroup
            radioClassName="flex-1 xs:flex-none"
            row
            value={n9?.has}
            onValueChange={handleChange}
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
              id={cancerIds["n9.age"]}
              value={n9?.age}
              onChange={onAgeChange}
              className="h-full max-w-20"
            />
          </LabelWrapper>
        </div>
      </DescriptionWrapper>
    </QnErrorBox>
  );
};
