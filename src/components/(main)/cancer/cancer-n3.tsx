import { DescriptionWrapper } from "@/components/description";
import { ICancerN3, useCancerStore } from "@/stores/cancer/cancer-store";
import React, { useState } from "react";
import CancerN3Group from "./cancer-n3-group";
import { cancerIds } from "@/lib/objects/cancer-obj";

export default function CancerN3() {
  const n3 = useCancerStore((state) => state.n3);
  const setN3Has = useCancerStore((state) => state.setN3Has);
  const setN3HasFam = useCancerStore((state) => state.setN3HasFam);
  const setN3EtcKind = useCancerStore((state) => state.setN3EtcKind);
  const [n3Keys] = useState<(keyof ICancerN3)[]>([
    "stomach",
    "breast",
    "colon",
    "liver",
    "cervical",
    "lung",
  ]);

  return (
    <DescriptionWrapper
      id={cancerIds.n3}
      headmark={"3"}
      text={"과거 병력(본인, 부모, 형제, 자매, 자녀) 복수개 선택 가능"}
    >
      {n3Keys.map((key, i) => (
        <CancerN3Group
          key={key}
          n3Key={key}
          n3={n3}
          nextN3Key={n3Keys.at(i + 1) ?? "etc"}
          onHasChange={setN3Has.bind(null, key)}
          onHasPamChange={setN3HasFam.bind(null, key)}
        />
      ))}
      <CancerN3Group
        key={"etc"}
        n3Key={"etc"}
        n3={n3}
        onHasChange={setN3Has.bind(null, "etc")}
        onHasPamChange={setN3HasFam.bind(null, "etc")}
        onEtcKindChange={setN3EtcKind}
      />
    </DescriptionWrapper>
  );
}
