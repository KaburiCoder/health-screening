"use client";
import { DescRadioGroup } from "@/components/desc-radio-group";
import { Title } from "@/components/title";
import { lsYnItems } from "@/lib/objects/lifestyle-obj";
import { useLsOverweightStore } from "@/stores/lifestyle/ls-overweight-store";
import React from "react";

export default function Overweight() {
  const { n1, n2, n3, setN1, setN2, setN3 } = useLsOverweightStore();

  return (
    <section className="flex flex-col gap-4">
      <Title>비만</Title>
      <DescRadioGroup
        id="id"
        headmark="1"
        text="현재 체중이 10대후반이나 20대 초반이었을때와 비교하여 10kg이상 늘었습니까?"
        items={lsYnItems}
        value={n1}
        onValueChange={setN1}
      />

      <DescRadioGroup
        id="id"
        headmark="2"
        text="당신은 현재까지 체중감량을 몇차례나 시도해보았습니까?"
        items={{
          "1": "전혀 해 본 적이 없다",
          "2": "1~3회",
          "3": "4회 이상",
          "4": "항상 노력하고 있다",
        }}
        value={n2}
        onValueChange={setN2}
      />

      <DescRadioGroup
        id="id"
        headmark="3"
        text="당신은 체중감량을통해 정상체중을 지속적으로 유지하는데 관심이 있습니까?"
        items={{
          "1": "별로 관심이 없다",
          "2": "어느 정도 관심이 있다",
          "3": "매우 관심이 있다",
        }}
        value={n3}
        onValueChange={setN3}
      />
    </section>
  );
}
