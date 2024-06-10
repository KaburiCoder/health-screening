import { DescriptionWrapper, QuoteDescription } from "@/components/description";
import React, { useMemo, useState } from "react";
import {
  CancerPresence,
  ICancerN5,
  useCancerStore,
} from "@/stores/cancer/cancer-store";
import BigCheckBox from "@/components/big-check-box";
import { CancerCheckBoxes } from "./cancer-check-boxes";

export default function CancerN5() {
  const n5 = useCancerStore((state) => state.n5);
  const setN5 = useCancerStore((state) => state.setN5);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setN5(
      e.target.value as keyof ICancerN5,
      e.target.checked ? CancerPresence.유 : CancerPresence.무,
    );
  }

  function handleHasChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setN5(
      e.target.value as keyof ICancerN5,
      e.target.checked ? CancerPresence.무 : CancerPresence.유,
    );
  }

  return (
    <DescriptionWrapper
      id={""}
      headmark={"5"}
      text={
        <span>
          현재 또는 과거에 진단받은 <span className="font-bold">위장질환</span>
          이 있으십니까?
        </span>
      }
    >
      <CancerCheckBoxes
        nObj={n5 as any}
        nKeyObj={
          [
            { nKey: "has", text: "없음" },
            { nKey: "wegueyang", text: "위궤양" },
            { nKey: "weyum", text: "위축성 위염" },
            { nKey: "jangsangpi", text: "장상피화생" },
            { nKey: "weyongjong", text: "위용증" },
            { nKey: "etc", text: "기타" },
          ] satisfies { nKey: keyof ICancerN5; text: string }[]
        }
        onChange={handleChange}
        onHasChange={handleHasChange}
      />
    </DescriptionWrapper>
  );
}
