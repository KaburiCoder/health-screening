import React, { useEffect, useMemo, useRef, useState } from "react";
import { DisabledProps } from "../../../../lib/props/disabled-props";
import { QnKeys } from "@/stores/condition-store";
import GenQn from "../gen-qn";
import Depression from "../depression";
import Cognitive from "../cognitive";
import { useCarouselNav } from "@/lib/hooks/use-carousel-nav";
import { useQnStoreValidator } from "./use-qn-store-validator";
import {
  ICognitive,
  IDepression,
  IQuestionnaire,
} from "health-screening-shared/interfaces";
import { useQnSave } from "./use-qn-save";

export const useQnController = () => {
  const { navKeys, validateAndResult } = useQnStoreValidator();
  const { isLoading, emitAck } = useQnSave();
  const dataRef = useRef<IQuestionnaire>();
  const { index, lastIndex, carouselItems, toNext, toPrev } = useCarouselNav({
    navKeys: navKeys,
    itemGroup: itemGroup,
  });
  const selectedKey = useMemo(() => navKeys[index] as QnKeys, [index]);

  function handlePrev() {
    toPrev();
  }

  function handleNext() {
    const { error, value } = validateAndResult(selectedKey);
    if (error) return;

    if (selectedKey === "gen") {
      dataRef.current = value as IQuestionnaire;
    } else if (dataRef.current) {
      switch (selectedKey) {
        case "cognitive":
          dataRef.current.cognitive = value as ICognitive;
          break;
        case "depression":
          dataRef.current.depression = value as IDepression;
          break;
      }
    }

    if (index === lastIndex) {
      emitAck({
        ...dataRef.current!,
      });
    }

    toNext();
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [index]);

  return {
    isLoading,
    index,
    lastIndex,
    carouselItems,
    handlePrev,
    handleNext,
  };
};

const itemGroup: {
  [key: string]: (props: DisabledProps) => React.JSX.Element;
} = {
  gen: GenQn,
  cognitive: Cognitive,
  depression: Depression,
};
