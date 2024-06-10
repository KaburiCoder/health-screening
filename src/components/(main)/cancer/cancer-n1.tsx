"use client";
import { CustomRadioGroup } from "@/components/custom-radio-group";
import { DescriptionWrapper } from "@/components/description";
import LabelWrapper from "@/components/label-wrapper";
import { cn } from "@/lib/utils";
import { CancerHas, useCancerStore } from "@/stores/cancer/cancer-store";
import { Input } from "@nextui-org/react";
import React from "react";

export default function CancerN1() {
  const n1 = useCancerStore((state) => state.n1);
  const setN1Yn = useCancerStore((state) => state.setN1Has);
  const setN1Symptom = useCancerStore((state) => state.setN1Symptom);

  return (
    <DescriptionWrapper
      id={""}
      headmark={"1"}
      text={"현재 신체 어느 부위에든 불편한 증상이 있습니까?"}
    >
      <div className="flex flex-col gap-2 xs:flex-row">
        <CustomRadioGroup
          radioClassName="flex-1 xs:flex-none"
          row
          // isDisabled={isDisabled}
          value={n1?.has}
          onValueChange={(v) => setN1Yn(v as CancerHas)}
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
            id="abc"
            value={n1?.symptom ?? ""}
            onChange={(e) => setN1Symptom(e.target.value)}
            className="h-full"
          />
        </LabelWrapper>
      </div>
    </DescriptionWrapper>
  );
}
