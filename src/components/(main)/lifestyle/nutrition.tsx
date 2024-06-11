"use client";
import { DescRadioGroup } from "@/components/desc-radio-group";
import { QnErrorBox } from "@/components/(main)/questionnaire/questionnaire-error-box";
import { Title } from "@/components/title";
import { lifestyleIds } from "@/lib/objects/lifestyle-obj";
import { useLsNutritionStore } from "@/stores/lifestyle/ls-nutrition-store";
import React from "react";
import { useFocus } from "../../../lib/hooks/use-focus";
import { DisabledProps } from "@/lib/props/disabled-props";

export default function Nutrition({ isDisabled }: DisabledProps) {
  const {
    n1,
    n2,
    n3,
    n4,
    n5,
    n6,
    n7,
    n8,
    n9,
    n10,
    n11,
    setN1,
    setN2,
    setN3,
    setN4,
    setN5,
    setN6,
    setN7,
    setN8,
    setN9,
    setN10,
    setN11,
  } = useLsNutritionStore();
  const { setValue } = useFocus();

  return (
    <section className="flex flex-col gap-4">
      <Title>영양</Title>
      <QnErrorBox selectedKey="nutrition" errorKeys={["n1"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.nutrition("n1")}
          headmark="1"
          text="우유나 칼슘강화두유, 기타 유제품(요구르트 등)을 매일 1컵(200ml)이상 마신다."
          items={baseItems}
          value={n1}
          onValueChange={setValue.bind(
            null,
            n1,
            setN1,
            lifestyleIds.nutrition("n2"),
          )}
        />
      </QnErrorBox>

      <QnErrorBox selectedKey="nutrition" errorKeys={["n2"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.nutrition("n2")}
          headmark="2"
          text="육류, 생선, 달걀, 콩, 두부 등으로 된 음식을 매일 3회이상 먹는다."
          items={baseItems}
          value={n2}
          onValueChange={setValue.bind(
            null,
            n2,
            setN2,
            lifestyleIds.nutrition("n3"),
          )}
        />
      </QnErrorBox>

      <QnErrorBox selectedKey="nutrition" errorKeys={["n3"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.nutrition("n3")}
          headmark="3"
          text="김치 이외의 채소를 식사할 때마다 먹는다."
          items={baseItems}
          value={n3}
          onValueChange={setValue.bind(
            null,
            n3,
            setN3,
            lifestyleIds.nutrition("n4"),
          )}
        />
      </QnErrorBox>

      <QnErrorBox selectedKey="nutrition" errorKeys={["n4"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.nutrition("n4")}
          headmark="4"
          text="과일(1개)을 매일 먹는다.(갈아먹는 형태 포함)"
          items={baseItems}
          value={n4}
          onValueChange={setValue.bind(
            null,
            n4,
            setN4,
            lifestyleIds.nutrition("n5"),
          )}
        />
      </QnErrorBox>
      <QnErrorBox selectedKey="nutrition" errorKeys={["n5"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.nutrition("n5")}
          headmark="5"
          text="튀김이나 볶음 요리를 얼마나 자주 먹습니까?"
          items={baseItems2}
          value={n5}
          onValueChange={setValue.bind(
            null,
            n5,
            setN5,
            lifestyleIds.nutrition("n6"),
          )}
        />
      </QnErrorBox>
      <QnErrorBox selectedKey="nutrition" errorKeys={["n6"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.nutrition("n6")}
          headmark="6"
          text="콜레스테롤이 많은 식품(삽겹살, 달걀노른자, 오징어 등)을 얼마나 자주 먹습니까?"
          items={baseItems2}
          value={n6}
          onValueChange={setValue.bind(
            null,
            n6,
            setN6,
            lifestyleIds.nutrition("n7"),
          )}
        />
      </QnErrorBox>
      <QnErrorBox selectedKey="nutrition" errorKeys={["n7"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.nutrition("n7")}
          headmark="7"
          text="아이스크림, 케이크, 과자, 음료수(믹스커피, 콜라, 식혜 등)중 1가지를 매일 먹는다."
          items={baseItems}
          value={n7}
          onValueChange={setValue.bind(
            null,
            n7,
            setN7,
            lifestyleIds.nutrition("n8"),
          )}
        />
      </QnErrorBox>
      <QnErrorBox selectedKey="nutrition" errorKeys={["n8"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.nutrition("n8")}
          headmark="8"
          text="젓갈, 장아찌, 자반 등을 매일 먹는다."
          items={baseItems}
          value={n8}
          onValueChange={setValue.bind(
            null,
            n8,
            setN8,
            lifestyleIds.nutrition("n9"),
          )}
        />
      </QnErrorBox>
      <QnErrorBox selectedKey="nutrition" errorKeys={["n9"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.nutrition("n9")}
          headmark="9"
          text="식사를 매일 정해진 시간에 한다."
          items={baseItems}
          value={n9}
          onValueChange={setValue.bind(
            null,
            n9,
            setN9,
            lifestyleIds.nutrition("n10"),
          )}
        />
      </QnErrorBox>
      <QnErrorBox selectedKey="nutrition" errorKeys={["n10"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.nutrition("n10")}
          headmark="10"
          text="곡류(밥, 빵류), 고기·생선·달걀·콩류, 채소류, 과일류, 우유류 등 총 5종류 식품중에서 하루에 보통 몇 종류의 식품을 드십니까?"
          items={{
            "1": "5종류",
            "2": "4종류",
            "3": "3종류 이하",
          }}
          value={n10}
          onValueChange={setValue.bind(
            null,
            n10,
            setN10,
            lifestyleIds.nutrition("n11"),
          )}
        />
      </QnErrorBox>
      <QnErrorBox selectedKey="nutrition" errorKeys={["n11"]}>
        <DescRadioGroup
          isDisabled={isDisabled}
          id={lifestyleIds.nutrition("n11")}
          headmark="11"
          text="곡류(밥, 빵류), 고기·생선·달걀·콩류, 채소류, 과일류, 우유류 등 총 5종류 식품중에서 하루에 보통 몇 종류의 식품을 드십니까?"
          items={{
            "1": "주 5회 이상",
            "2": "주 2-4회",
            "3": "주 1회 이하",
          }}
          value={n11}
          onValueChange={setValue.bind(
            null,
            n11,
            setN11,
            lifestyleIds.nutrition("n11"),
          )}
        />
      </QnErrorBox>
    </section>
  );
}

const baseItems = {
  "1": "항상 그런 편이다",
  "2": "보통이다",
  "3": "아닌 편이다",
};

const baseItems2 = {
  "1": "주 4회 이상",
  "2": "주 2-3회",
  "3": "주 1회 이하",
};
