"use client";
import { DescRadioGroup } from "@/components/desc-radio-group";
import { QnErrorBox } from "@/components/(main)/questionnaire/questionnaire-error-box";
import { Title } from "@/components/title";
import React from "react";
import { DisabledProps } from "@/lib/props/disabled-props";
import { useFocus } from "../../../lib/hooks/use-focus";
import { useQnDepressionStore } from "@/stores/questionnaire/gn-depression-store";
import { questionIds } from "@/lib/objects/questionnaire-obj";
import { getLoopItems } from "./_utils/get-loop-items";

export default function Depression({ isDisabled }: DisabledProps) {
  const store = useQnDepressionStore();
  const { setValue } = useFocus();

  return (
    <section className="flex flex-col gap-4">
      <Title>정신건강(우울증)</Title>
      {items.map((text, i) => {
        const { key, nextKey, number, value, setValueFn } = getLoopItems(
          store,
          items,
          i,
        );

        return (
          <QnErrorBox key={i} selectedKey="depression" errorKeys={[key]}>
            <DescRadioGroup
              isDisabled={isDisabled}
              id={questionIds.depression(key)}
              headmark={number.toString()}
              text={text}
              items={baseItems}
              value={value}
              onValueChange={setValue.bind(
                null,
                value,
                setValueFn,
                questionIds.depression(nextKey),
              )}
            />
          </QnErrorBox>
        );
      })}
    </section>
  );
}

const items = [
  "일을 하는 것에 대한 흥미나 재미가 거의 없음",
  "가라앉은 느낌. 우울감 혹은 절망감",
  "잠들기 어렵거나 자꾸 깨어남, 혹은 너무 많이 잠",
  "피곤함, 기력이 저하됨",
  "식욕 저하 혹은 과식",
  "내 자신이 나쁜 사람이라는 느낌 혹은 내 자신을 실패자라고 느끼거나 나 때문에 나 자신이나 내 가족이 불행하게 되었다는 느낌",
  "신문을 읽거나 TV를 볼 때 집중하기 어려움",
  "남들이 알아챌 정도로 거동이나 말이 느림, 또는 반대로 너무 초조하고 안절부절 못해서 평소보다 많이 돌아다니고 서성거림",
  "나는 차라리 죽는 것이 낫겠다는 등의 생각 혹은 어떤 식으로든 스스로를 해치는 생각들",
];

const baseItems = {
  "1": "전혀 아니다",
  "2": "여러날 동안",
  "3": "일주일 이상",
  "4": "거의 매일",
};
