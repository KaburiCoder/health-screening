import { CustomRadioGroup } from "@/components/custom-radio-group";
import { DescriptionWrapper } from "@/components/description";
import LabelWrapper from "@/components/label-wrapper";
import { NumInput } from "@/components/num-input";
import { cancerIds } from "@/lib/objects/cancer-obj";
import { CancerWeight, useCancerStore } from "@/stores/cancer/cancer-store";
import { cn } from "@nextui-org/react";
import React from "react";
import { QnErrorBox } from "../questionnaire/questionnaire-error-box";
import { useFocus } from "@/lib/hooks/use-focus";

export default function CancerN2() {
  const n2 = useCancerStore((state) => state.n2);
  const setN2Has = useCancerStore((state) => state.setN2Has);
  const setN2Kg = useCancerStore((state) => state.setN2Kg);
  const { conditions, scrollToFocus, focusDelay, setNumValueTrg } = useFocus();

  function handleChange(value: string): void {
    const has = value as CancerWeight;
    setN2Has(has);
    if (has === CancerWeight.아니오) return scrollToFocus(cancerIds.n3);

    focusDelay(cancerIds["n2.kg"]);
  }

  function handleKgChange(value: number | undefined): void {
    setNumValueTrg(
      n2?.kg,
      setN2Kg,
      {
        blur: { id: cancerIds["n2.kg"] },
        scroll: { id: cancerIds.n3, condition: conditions.twoDigit },
      },
      value,
    );
  }

  return (
    <DescriptionWrapper
      id={cancerIds.n2}
      headmark={"2"}
      text={"지난 6개월 간 특별한 이유 없이 5Kg 이상의 체중감소가 있었습니까?"}
    >
      <QnErrorBox
        selectedKey="cancer"
        errorKeys={[cancerIds.n2, cancerIds["n2.kg"]]}
      >
        <div className="flex flex-col gap-2 gap-x-4 xs:flex-row">
          <CustomRadioGroup
            radioClassName="flex-1 xs:flex-none"
            row
            // isDisabled={isDisabled}
            value={n2?.has}
            onValueChange={handleChange}
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
              id={cancerIds["n2.kg"]}
              value={n2?.kg}
              onChange={handleKgChange}
              className="h-full max-w-20"
            />
          </LabelWrapper>
        </div>
      </QnErrorBox>
    </DescriptionWrapper>
  );
}
