import React from "react";
import { DescriptionWrapper } from "@/components/description";
import { ICancerN8, useCancerStore } from "@/stores/cancer/cancer-store";
import { CancerCheckBoxes } from "./cancer-check-boxes";
import useCheckChange from "./_hooks/use-check-change";
import { QnErrorBox } from "../questionnaire/questionnaire-error-box";
import { cancerIds } from "@/lib/objects/cancer-obj";

export default function CancerN8() {
  const n8 = useCancerStore((state) => state.n8);
  const setN8 = useCancerStore((state) => state.setN8);
  const { handleChange, handleHasChange } = useCheckChange(setN8);

  return (
    <QnErrorBox selectedKey="cancer" errorKeys={[cancerIds.n8]}>
      <DescriptionWrapper
        id={cancerIds.n8}
        headmark={"8"}
        text={
          <span>
            현재 또는 과거에 진단받은{" "}
            <span className="font-bold">대장 항문질환</span>이 있으십니까?
          </span>
        }
      >
        <CancerCheckBoxes
          nObj={n8 as any}
          nKeyObj={
            [
              { nKey: "has", text: "없음" },
              { nKey: "mansungPye", text: "만성폐쇄성폐질환" },
              { nKey: "pyegulhack", text: "폐결핵" },
              { nKey: "pyegyuljul", text: "폐결절" },
              { nKey: "ganjilPye", text: "간질성폐질환" },
              { nKey: "jinpye", text: "진폐증" },
              { nKey: "etc", text: "기타" },
            ] satisfies { nKey: keyof ICancerN8; text: string }[]
          }
          onChange={handleChange}
          onHasChange={handleHasChange.bind(null, cancerIds.n9)}
        />
      </DescriptionWrapper>
    </QnErrorBox>
  );
}
