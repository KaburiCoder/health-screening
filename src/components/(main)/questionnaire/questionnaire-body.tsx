"use client";
import React, { useEffect } from "react";
import { useQnClear } from "./_hooks/use-qn-clear";
import { useQnController } from "./_hooks/use-qn-controller";
import { CarouselX } from "@/components/carousel-x/carousel-x";
import LsNextButtons from "../lifestyle/ls-next-buttons";
import ScrollDownAnimation from "./scroll-down-animation/scroll-down-animation";

const QuestionaireBody = () => {
  const { isLoading, index, lastIndex, carouselItems, handleNext, handlePrev } =
    useQnController();
  const { clear } = useQnClear();

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  return (
    <>
      <CarouselX index={index}>{carouselItems}</CarouselX>
      <LsNextButtons
        index={index}
        lastIndex={lastIndex}
        isLoading={isLoading}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <ScrollDownAnimation />
    </>
  );
};

export default QuestionaireBody;
