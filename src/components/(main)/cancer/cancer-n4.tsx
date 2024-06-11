import { DescriptionWrapper, QuoteDescription } from "@/components/description";
import React, { useMemo, useState } from "react";
import { CustomRadioGroup } from "@/components/custom-radio-group";
import { ICancerN4, useCancerStore } from "@/stores/cancer/cancer-store";
import { useSelectionPatientStore } from "@/stores/selection-patient-store";
import { cancerIds } from "@/lib/objects/cancer-obj";
import { QnErrorBox } from "../questionnaire/questionnaire-error-box";
import { useFocus } from "@/lib/hooks/use-focus";

export default function CancerN4() {
  const patient = useSelectionPatientStore((state) => state.patient);
  const n4 = useCancerStore((state) => state.n4);
  const sex = useCancerStore((state) => state.sex);
  const setN4Select = useCancerStore((state) => state.setN4Select);
  const { scrollToFocus } = useFocus();
  const n4Keys = useMemo<(keyof ICancerN4)[]>(() => {
    const keys: (keyof ICancerN4)[] = [
      "weJoyung",
      "weNesigyung",
      "yubang",
      "daejangJamhyul",
      "daejangNesigyung",
      "jagungGyungbu",
      "pyeHyungbuCT",
      "ganChoumpa",
    ];
    return sex !== "F"
      ? keys.filter((k) => k !== "yubang" && k !== "jagungGyungbu")
      : keys;
  }, [patient, sex]);

  function handleChange(
    nextKey: keyof ICancerN4 | undefined,
    key: keyof ICancerN4,
    value: string,
  ): void {
    setN4Select(key, value);
    if (nextKey) {
      return scrollToFocus(errorKeys[nextKey]?.at(-1)!);
    }
    return scrollToFocus(cancerIds.n5);
  }

  return (
    <DescriptionWrapper
      id={cancerIds.n4}
      headmark={"4"}
      text={"귀하는 다음의 검사를 받은 적이 있습니까?"}
    >
      <ul>
        {n4Keys.map((key, i) => (
          <li key={key}>
            <QnErrorBox selectedKey="cancer" errorKeys={errorKeys[key]!}>
              <QuoteDescription text={n4Names[key]} />
              <CustomRadioGroup
                id={errorKeys[key]!.at(-1)}
                radioClassName="flex-1 xs:flex-none"
                value={n4?.[key] ?? ""}
                onValueChange={handleChange.bind(null, n4Keys.at(i + 1), key)}
                items={
                  key === "ganChoumpa"
                    ? [
                        ["1", "한적 없음"],
                        ["2", "6개월 이내"],
                        ["3", "6개월에서 1년 사이"],
                        ["4", "1년보다 오래전에"],
                      ]
                    : [
                        ["1", "10년 이상 또는 한 적 없음"],
                        ["2", "1년 미만"],
                        ["3", "1년 이상 ~ 2년 미만"],
                        ["4", "2년 이상 ~ 10년 미만"],
                      ]
                }
              />
            </QnErrorBox>
          </li>
        ))}
      </ul>
    </DescriptionWrapper>
  );
}

const n4Names: { [key in keyof ICancerN4]: string } = {
  weJoyung: "[위암]위장조영검사",
  weNesigyung: "[위암]위내시경",
  yubang: "[유방암]유방촬영",
  daejangJamhyul: "[대장암]분변잠혈반응검사",
  daejangNesigyung: "[대장암]대장내시경",
  jagungGyungbu: "[자궁경부암]자궁경부세포검사",
  pyeHyungbuCT: "[폐암]흉부CT",
  ganChoumpa: "[간암]간초음파",
};

const errorKeys: { [key in keyof ICancerN4]: string[] } = {
  weJoyung: [cancerIds.n4, cancerIds["n4.weJoyung"]],
  weNesigyung: [cancerIds["n4.weNesigyung"]],
  yubang: [cancerIds["n4.yubang"]],
  daejangJamhyul: [cancerIds["n4.daejangJamhyul"]],
  daejangNesigyung: [cancerIds["n4.daejangNesigyung"]],
  jagungGyungbu: [cancerIds["n4.jagungGyungbu"]],
  pyeHyungbuCT: [cancerIds["n4.pyeHyungbuCT"]],
  ganChoumpa: [cancerIds["n4.ganChoumpa"]],
};
