"use client";
import { DescRadioGroup } from "@/components/desc-radio-group";
import { QnErrorBox } from "@/components/(main)/questionnaire/questionnaire-error-box";
import { Title } from "@/components/title";
import { lifestyleIds } from "@/lib/objects/lifestyle-obj";
import { useLsDrinkingStore } from "@/stores/lifestyle/ls-drinking-store";
import React from "react";
import { DisabledProps } from "../../../lib/props/disabled-props";
import { useFocus } from "../../../lib/hooks/use-focus";

export default function Drinking({ isDisabled }: DisabledProps) {
  const {
    n1,
    n2_1,
    n2_2,
    n3,
    n4,
    n5,
    n6,
    n7,
    n8,
    n9,
    n10,
    setN1,
    setN2_1,
    setN2_2,
    setN3,
    setN4,
    setN5,
    setN6,
    setN7,
    setN8,
    setN9,
    setN10,
  } = useLsDrinkingStore();
  const { setValue } = useFocus();

  return (
    <section className="flex flex-col gap-4">
      <Title>음주</Title>

      <QnErrorBox selectedKey="drinking" errorKeys={["n1"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.drinking("n1")}
          headmark={"1"}
          text={"술을 마시는 횟수는 어느 정도입니까?"}
          items={{
            "1": "한 달에 1번 이하",
            "2": "한 달에 2~4번",
            "3": "일주일에 2~3번",
            "4": "일주일에 4번 이상",
          }}
          value={n1}
          onValueChange={setValue.bind(
            null,
            n1,
            setN1,
            lifestyleIds.drinking("n2_1"),
          )}
        />
      </QnErrorBox>

      <QnErrorBox selectedKey="drinking" errorKeys={["n2_1"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.drinking("n2_1")}
          headmark={"2-1"}
          text={"술(소주)을 마시는 날은 보통 몇잔을 마십니까?"}
          items={{
            "1": "반병 이하",
            "2": "1병 이하",
            "3": "1.5병 정도",
            "4": "2병 정도",
            "5": "2.5병 이상",
          }}
          value={n2_1}
          onValueChange={setValue.bind(
            null,
            n2_1,
            setN2_1,
            lifestyleIds.drinking("n2_2"),
          )}
        />
      </QnErrorBox>

      <QnErrorBox selectedKey="drinking" errorKeys={["n2_2"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.drinking("n2_2")}
          headmark={"2-2"}
          text={
            "기타의 술(양주1잔/와인1잔/막걸리 한사발/캔맥주 1캔 /작은 병맥주 1병 1잔으로 생맥주 500은 1.3 잔으로 계산)"
          }
          value={n2_2}
          items={{
            "1": "1~2잔",
            "2": "3~4잔",
            "3": "5~6잔",
            "4": "7~9잔",
            "5": "10잔 이상",
          }}
          onValueChange={setValue.bind(
            null,
            n2_2,
            setN2_2,
            lifestyleIds.drinking("n3"),
          )}
        />
      </QnErrorBox>

      <QnErrorBox selectedKey="drinking" errorKeys={["n3"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.drinking("n3")}
          headmark={"3"}
          text={
            "한 번의 술좌석에서 소주 1병을 초과 또는 맥주 5캔(생맥주 2000cc이상)이상을 마시는 횟수는? (알코올 60g 해당/양주,와인,막걸리는 각 5잔 이상)"
          }
          value={n3}
          items={baseItems}
          onValueChange={setValue.bind(
            null,
            n3,
            setN3,
            lifestyleIds.drinking("n4"),
          )}
        />
      </QnErrorBox>

      <QnErrorBox selectedKey="drinking" errorKeys={["n4"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.drinking("n4")}
          headmark={"4"}
          text={
            "지난 1년간, 일단 술을 마시기 시작하여 자제가 안 된 적이 있습니까?"
          }
          value={n4}
          items={baseItems}
          onValueChange={setValue.bind(
            null,
            n4,
            setN4,
            lifestyleIds.drinking("n5"),
          )}
        />
      </QnErrorBox>

      <QnErrorBox selectedKey="drinking" errorKeys={["n5"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.drinking("n5")}
          headmark={"5"}
          text={"지난 1년간,음주때문에 일상생활에 지장을 받은 적이 있습니까?"}
          value={n5}
          items={baseItems}
          onValueChange={setValue.bind(
            null,
            n5,
            setN5,
            lifestyleIds.drinking("n6"),
          )}
        />
      </QnErrorBox>

      <QnErrorBox selectedKey="drinking" errorKeys={["n6"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.drinking("n6")}
          headmark={"6"}
          text={
            "지난 1년간,과음 후 다음날 아침 정신을 차리기 위해 해장술을 마신 적이 있습니까?"
          }
          value={n6}
          items={baseItems}
          onValueChange={setValue.bind(
            null,
            n6,
            setN6,
            lifestyleIds.drinking("n7"),
          )}
        />
      </QnErrorBox>

      <QnErrorBox selectedKey="drinking" errorKeys={["n7"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.drinking("n7")}
          headmark={"7"}
          text={"지난 1년간, 음주 후 술을 마신것에 대해 후회한 적이 있습니까?"}
          value={n7}
          items={baseItems}
          onValueChange={setValue.bind(
            null,
            n7,
            setN7,
            lifestyleIds.drinking("n8"),
          )}
        />
      </QnErrorBox>

      <QnErrorBox selectedKey="drinking" errorKeys={["n8"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.drinking("n8")}
          headmark={"8"}
          text={
            "지난 1년간, 술이 깬 후에 취중의 일을 기억할 수 없었던 적이 있습니까?"
          }
          value={n8}
          items={baseItems}
          onValueChange={setValue.bind(
            null,
            n8,
            setN8,
            lifestyleIds.drinking("n9"),
          )}
        />
      </QnErrorBox>

      <QnErrorBox selectedKey="drinking" errorKeys={["n9"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.drinking("n9")}
          headmark={"9"}
          text={
            "당신의 음주로 인해 본인이 다치거나, 또는 가족이나 타인이 다친 적이 있습니까?"
          }
          value={n9}
          items={baseItems2}
          onValueChange={setValue.bind(
            null,
            n9,
            setN9,
            lifestyleIds.drinking("n10"),
          )}
        />
      </QnErrorBox>

      <QnErrorBox selectedKey="drinking" errorKeys={["n10"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.drinking("n10")}
          headmark={"10"}
          text={
            "가족이나 의사가 당신의 음주에 대해 걱정을 하거나, 또는 '술을 끊거나  줄이라'는 권고를 한 적이 있습니까?"
          }
          value={n10}
          items={baseItems2}
          onValueChange={setValue.bind(
            null,
            n10,
            setN10,
            lifestyleIds.drinking("n10"),
          )}
        />
      </QnErrorBox>
    </section>
  );
}

const baseItems = {
  "1": "전혀 없다",
  "2": "한 달에 한 번 미만",
  "3": "한 달에 한 번 정도",
  "4": "일주일에 한 번 정도",
  "5": "거의 매일",
};

const baseItems2 = {
  "1": "전혀 없었다",
  "2": "과거에는 있었지만, 지난 1년 동안에는 없었다",
  "3": "지난 1년 동안에 있었다",
};
