import { CustomRadioGroup } from "@/components/custom-radio-group";
import { cancerIds } from "@/lib/objects/cancer-obj";
import { cn } from "@/lib/utils";
import {
  CancerHasTh,
  CancerPresence,
  ICancerHasFamily,
  ICancerN3,
} from "@/stores/cancer/cancer-store";
import { Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import React from "react";
import { QnErrorBox } from "../questionnaire/questionnaire-error-box";
import { useFocus } from "@/lib/hooks/use-focus";

interface Props {
  n3Key: keyof ICancerN3;
  n3: ICancerN3 | undefined;
  nextN3Key?: keyof ICancerN3;
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
  nextN3Key,
  onHasChange,
  onHasPamChange,
  onEtcKindChange,
}: Props) {
  const has = n3?.[n3Key]?.has;
  const { scrollToFocus } = useFocus();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const hasFam = e.target.value as keyof ICancerHasFamily;
    const presence = e.target.checked ? CancerPresence.유 : CancerPresence.무;

    onHasPamChange(hasFam, presence);
  }

  function handleHasChange(value: string): void {
    const has = value as CancerHasTh;
    onHasChange(has);
    if (has === CancerHasTh.없다 || has === CancerHasTh.모름) {
      if (nextN3Key) {
        return scrollToFocus(errorKeys[nextN3Key]!.at(0)!);
      }
      return scrollToFocus(cancerIds.n4);
    }
  }

  return (
    <div
      id={errorKeys[n3Key]!.at(-1)}
      className="flex items-center gap-2 border-b-1 border-b-purple-200 pb-2"
    >
      <div className="w-20 flex-shrink-0">
        <span className="">{cancerNames[n3Key]}</span>
        <span>:</span>
        {n3Key === "etc" && (
          <QnErrorBox
            selectedKey="cancer"
            errorKeys={[cancerIds["n3.etc.kind"]]}
          >
            <Input
              id={cancerIds["n3.etc.kind"]}
              className={cn(n3?.etc?.has !== CancerHasTh.있다 ? "hidden" : "")}
              variant="bordered"
              color="success"
              value={n3?.etc?.kind ?? ""}
              onChange={(e) => onEtcKindChange?.(e.target.value)}
            />
          </QnErrorBox>
        )}
      </div>
      <QnErrorBox selectedKey="cancer" errorKeys={errorKeys[n3Key]!}>
        <div className="flex flex-col items-center gap-2 lg:flex-row">
          <CustomRadioGroup
            radioClassName="flex-1 xs:flex-none"
            row
            value={has}
            onValueChange={handleHasChange}
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
      </QnErrorBox>
    </div>
  );
}

const errorKeys: { [key in keyof ICancerN3]: string[] } = {
  stomach: [cancerIds.n3, cancerIds["n3.stomach"]],
  breast: [cancerIds["n3.breast"]],
  cervical: [cancerIds["n3.cervical"]],
  colon: [cancerIds["n3.colon"]],
  etc: [cancerIds["n3.etc"]],
  liver: [cancerIds["n3.liver"]],
  lung: [cancerIds["n3.lung"]],
};
