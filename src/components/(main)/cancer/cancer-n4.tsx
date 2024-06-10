import { DescriptionWrapper, QuoteDescription } from "@/components/description";
import React, { useMemo, useState } from "react";
import { CustomRadioGroup } from "@/components/custom-radio-group";
import { ICancerN4, useCancerStore } from "@/stores/cancer/cancer-store";
import { useSelectionPatientStore } from "@/stores/selection-patient-store";

export default function CancerN4() {
  const patient = useSelectionPatientStore((state) => state.patient);
  const n4 = useCancerStore((state) => state.n4);
  const setN4Select = useCancerStore((state) => state.setN4Select);
  const n4Keys = useMemo<(keyof ICancerN4)[]>(() => {
    const keys: (keyof ICancerN4)[] = [
      "weJoyeong",
      "weNesigyung",
      "yubang",
      "daejangJamhyul",
      "daejangNesigyung",
      "jagungGyungbu",
      "pyeHyungbuCT",
      "ganChoumpa",
    ];
    return keys.filter((k) => k !== "yubang" && k !== "jagungGyungbu");
  }, [patient]);

  return (
    <DescriptionWrapper
      id={""}
      headmark={"4"}
      text={"귀하는 다음의 검사를 받은 적이 있습니까?"}
    >
      <ul>
        {n4Keys.map((key) => (
          <li key={key}>
            <QuoteDescription text={n4Names[key]} />
            <CustomRadioGroup
              radioClassName="flex-1 xs:flex-none"
              value={n4?.[key] ?? ""}
              onValueChange={setN4Select.bind(null, key)}
              items={[
                ["1", "10년 이상 또는 한 적 없음"],
                ["2", "1년 미만"],
                ["3", "1년 이상 ~ 2년 미만"],
                ["4", "2년 이상 ~ 10년 미만"],
              ]}
            />
          </li>
        ))}
      </ul>
    </DescriptionWrapper>
  );
}

const n4Names: { [key in keyof ICancerN4]: string } = {
  weJoyeong: "[위암]위장조영검사",
  weNesigyung: "[위암]위내시경",
  yubang: "[유방암]유방촬영",
  daejangJamhyul: "[대장암]분변잠혈반응검사",
  daejangNesigyung: "[대장암]대장내시경",
  jagungGyungbu: "[자궁경부암]자궁경부세포검사",
  pyeHyungbuCT: "[폐암]흉부CT",
  ganChoumpa: "[간암]간초음파",
};
