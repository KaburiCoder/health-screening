"use client";
import { CustomRadioGroup } from "@/components/custom-radio-group";
import { DescriptionWrapper } from "@/components/description";
import LabelWrapper from "@/components/label-wrapper";
import { cn } from "@/lib/utils";
import { CancerHas, useCancerStore } from "@/stores/cancer/cancer-store";
import { Input } from "@nextui-org/react";
import React from "react";
import { QnErrorBox } from "../questionnaire/questionnaire-error-box";
import { cancerIds } from "@/lib/objects/cancer-obj";
import { useFocus } from "@/lib/hooks/use-focus";

export default function CancerN1() {
  const n1 = useCancerStore((state) => state.n1);
  const setN1Yn = useCancerStore((state) => state.setN1Has);
  const setN1Symptom = useCancerStore((state) => state.setN1Symptom);
  const { scrollToFocus, focusDelay } = useFocus();

  function handleChange(value: string): void {
    const has = value as CancerHas;
    setN1Yn(has);
    if (has === CancerHas.아니오) return scrollToFocus(cancerIds.n2);

    focusDelay(cancerIds["n1.symptom"]);
  }

  return (
    <DescriptionWrapper
      id={cancerIds.n1}
      headmark={"1"}
      text={"현재 신체 어느 부위에든 불편한 증상이 있습니까?"}
    >
      <QnErrorBox
        selectedKey="cancer"
        errorKeys={[cancerIds.n1, cancerIds["n1.symptom"]]}
      >
        <div className="flex flex-col gap-2 xs:flex-row">
          <CustomRadioGroup
            radioClassName="flex-1 xs:flex-none"
            row
            value={n1?.has}
            onValueChange={handleChange}
            items={{
              "1": "예",
              "2": "아니오",
            }}
          />
          <LabelWrapper
            className={cn("flex-1", n1?.has !== CancerHas.예 ? "hidden" : "")}
            start="증상:"
          >
            <Input
              id={cancerIds["n1.symptom"]}
              value={n1?.symptom ?? ""}
              onChange={(e) => setN1Symptom(e.target.value)}
              className="h-full"
            />
          </LabelWrapper>
        </div>
      </QnErrorBox>
    </DescriptionWrapper>
  );
}
