"use client";
import { DescRadioGroup } from "@/components/desc-radio-group";
import { QnErrorBox } from "@/components/(main)/questionnaire/questionnaire-error-box";
import { Title } from "@/components/title";
import React from "react";
import { DisabledProps } from "@/lib/props/disabled-props";
import { useFocus } from "../../../lib/hooks/use-focus";
import {
  QnDepressionState,
  useQnDepressionStore,
} from "@/stores/questionnaire/gn-depression-store";
import { questionIds } from "@/lib/objects/questionnaire-obj";
import { useQnCognitiveStore } from "@/stores/questionnaire/gn-cognitive-store";
import { getLoopItems } from "./_utils/get-loop-items";

export default function Cognitive({ isDisabled }: DisabledProps) {
  const store = useQnCognitiveStore();
  const { setValue } = useFocus();

  return (
    <section className="flex flex-col gap-4">
      <Title>인지기능장애</Title>
      {items.map((text, i) => {
        const { key, nextKey, number, value, setValueFn } = getLoopItems(
          store,
          items,
          i,
        );

        return (
          <QnErrorBox key={i} selectedKey="cognitive" errorKeys={[key]}>
            <DescRadioGroup
              isDisabled={isDisabled}
              id={questionIds.cognitive(key)}
              headmark={number.toString()}
              text={text}
              items={baseItems}
              value={value}
              onValueChange={setValue.bind(
                null,
                value,
                setValueFn,
                questionIds.cognitive(nextKey),
              )}
            />
          </QnErrorBox>
        );
      })}
    </section>
  );
}

const items = [
  "오늘이 몇 월이고, 무슨 요일인지를 잘 모른다",
  "자기가 놔둔 물건을 찾지 못 한다.",
  "같은 질문을 반복해서 한다.",
  "약속을 하고서 잊어버린다.",
  "물건을 가지러 갔다가 잊어버리고 그냥 온다.",
  "물건이나, 사람의 이름을 대기가 힘들어 머뭇거린다.",
  "대화 중 내용이 이해되지 않아 반복해서 물어 본다.",
  "길을 잃어버린 적이 있다.",
  "예전에 비해서 계산능력이 떨어진다.",
  "예전에 비해 성격이 변했다.",
  "예전에 잘 다루던 기구의 사용이 서툴러졌다.",
  "예전에 비해 방이나 가구의 정리정돈을 하지 못 한다.",
  "상황에 맞춰 스스로 옷을 선택하여 입지 못한다.",
  "혼자 대중교통 수단을 이용하여 목적지에 가기 힘들다.",
  "내복이나 옷이 더러워졌는데도 갈아입지 않으려고 한다.",
];

const baseItems = {
  "1": "아니다",
  "2": "가끔(조금) 그렇다",
  "3": "자주(많이) 그렇다",
};
