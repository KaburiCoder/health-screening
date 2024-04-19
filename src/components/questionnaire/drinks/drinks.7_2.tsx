import { Description, SparkleDescription } from "@/components/description";
import React from "react";
import DrinksCc from "./drinks-cc";

export default function Drinks7d2() {
  return (
    <>
      <Description headmark="7-2" text="하루 동안 가장 많이 마셨던 음주량은 어느 정도입니까?" />
      <SparkleDescription
        text={`잔 또는 병 또는 캔 또는 cc 중 한 곳에만 작성해 주십시오(술 종류는 복수응답 가능, 하루에 마신 총 양으로 합산, 기타 술 종류는 비슷한 술 종류에 표기)`}
      />
      <SparkleDescription
        className="mt-0"
        text={`폭음: 하루 동안의 최대음주량으로 판단`}
      />
      <DrinksCc />
    </>
  );
}
