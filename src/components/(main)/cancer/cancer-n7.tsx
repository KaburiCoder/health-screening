import React from "react";
import { DescriptionWrapper } from "@/components/description";
import { ICancerN7, useCancerStore } from "@/stores/cancer/cancer-store";
import { CancerCheckBoxes } from "./cancer-check-boxes";
import useCheckChange from "./_hooks/use-check-change";
import { QnErrorBox } from "../questionnaire/questionnaire-error-box";
import { cancerIds } from "@/lib/objects/cancer-obj";

export default function CancerN7() {
  const n7 = useCancerStore((state) => state.n7);
  const setN7 = useCancerStore((state) => state.setN7);
  const { handleChange, handleHasChange } = useCheckChange(setN7);

  return (
    <QnErrorBox selectedKey="cancer" errorKeys={[cancerIds.n7]}>
      <DescriptionWrapper
        id={cancerIds.n7}
        headmark={"7"}
        text={
          <span>
            <span className="font-bold">간(肝)질환</span>이 있으십니까?
          </span>
        }
      >
        <CancerCheckBoxes
          nObj={n7 as any}
          nKeyObj={
            [
              { nKey: "has", text: "없음" },
              { nKey: "bGanyum", text: "B형간염 바이러스보유자" },
              { nKey: "mansungB", text: "만성 B형간염" },
              { nKey: "mansungC", text: "만성 C형간염" },
              { nKey: "gangyungbyun", text: "간경변" },
              { nKey: "etc", text: "기타" },
            ] satisfies { nKey: keyof ICancerN7; text: string }[]
          }
          onChange={handleChange}
          onHasChange={handleHasChange.bind(null, cancerIds.n8)}
        />
      </DescriptionWrapper>
    </QnErrorBox>
  );
}
