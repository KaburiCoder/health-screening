import { DescriptionWrapper, QuoteDescription } from "@/components/description";
import React, { useMemo, useState } from "react";
import { ICancerN5, useCancerStore } from "@/stores/cancer/cancer-store";
import { CancerCheckBoxes } from "./cancer-check-boxes";
import { QnErrorBox } from "../questionnaire/questionnaire-error-box";
import { cancerIds } from "@/lib/objects/cancer-obj";
import useCheckChange from "./_hooks/use-check-change";

export default function CancerN5() {
  const n5 = useCancerStore((state) => state.n5);
  const setN5 = useCancerStore((state) => state.setN5);
  const { handleChange, handleHasChange } = useCheckChange(setN5);

  return (
    <QnErrorBox selectedKey="cancer" errorKeys={[cancerIds.n5]}>
      <DescriptionWrapper
        id={cancerIds.n5}
        headmark={"5"}
        text={
          <span>
            현재 또는 과거에 진단받은{" "}
            <span className="font-bold">위장질환</span>이 있으십니까?
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
          onHasChange={handleHasChange.bind(null, cancerIds.n6)}
        />
      </DescriptionWrapper>
    </QnErrorBox>
  );
}
