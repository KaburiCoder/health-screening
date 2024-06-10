import { CustomRadioGroup } from "@/components/custom-radio-group";
import { cn } from "@/lib/utils";
import {
  CancerHasTh,
  CancerPresence,
  ICancerHasFamily,
  ICancerN3,
} from "@/stores/cancer/cancer-store";
import { Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import React from "react";

interface Props {
  n3Key: keyof ICancerN3;
  n3: ICancerN3 | undefined;
  onHasChange: (value: CancerHasTh) => void;
  onHasPamChange: (
    hasFam: keyof ICancerHasFamily,
    presence: CancerPresence,
  ) => void;
  onEtcKindChange?: (kind: string) => void;
}

const cancerNames: { [key in keyof ICancerN3]: string } = {
  stomach: "위암",
  breast: "유방암",
  colon: "대장암",
  liver: "간암",
  cervical: "자궁경부암",
  lung: "폐암",
  etc: "기타",
};

export default function CancerN3Group({
  n3Key,
  n3,
  onHasChange,
  onHasPamChange,
  onEtcKindChange,
}: Props) {
  const has = n3?.[n3Key]?.has;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const hasFam = e.target.value as keyof ICancerHasFamily;
    const presence = e.target.checked ? CancerPresence.유 : CancerPresence.무;

    onHasPamChange(hasFam, presence);
  }

  return (
    <div className="flex items-center gap-2 border-b-1 border-b-purple-200 pb-2">
      <div className="w-20 flex-shrink-0">
        <span className="">{cancerNames[n3Key]}</span>
        <span>:</span>
        {n3Key === "etc" && (
          <Input
            className={cn(n3?.etc?.has !== CancerHasTh.있다 ? "hidden" : "")}
            variant="bordered"
            color="success"
            value={n3?.etc?.kind ?? ""}
            onChange={(e) => onEtcKindChange?.(e.target.value)}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 items-center lg:flex-row">
        <CustomRadioGroup
          radioClassName="flex-1 xs:flex-none"
          row
          // isDisabled={isDisabled}
          value={has}
          onValueChange={(v) => onHasChange(v as CancerHasTh)}
          items={[
            ["1", "없다"],
            ["2", "있다"],
            ["3", "모름"],
          ]}
        />
        <CheckboxGroup
          className={cn(
            "rounded-lg border border-slate-300 p-2.5",
            has !== CancerHasTh.있다 ? "hidden" : "",
          )}
          value={Object.entries(n3?.[n3Key] ?? {})
            .map(([k, v]) => (v === CancerPresence.유 ? k : ""))
            .filter((k) => k !== "")}
          classNames={{ wrapper: "flex-row" }}
        >
          <Checkbox value={"self"} onChange={handleChange}>
            본인
          </Checkbox>
          <Checkbox value={"parents"} onChange={handleChange}>
            부모
          </Checkbox>
          <Checkbox value={"brother"} onChange={handleChange}>
            형제
          </Checkbox>
          <Checkbox value={"sister"} onChange={handleChange}>
            자매
          </Checkbox>
          <Checkbox value={"children"} onChange={handleChange}>
            자녀
          </Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  );
}
