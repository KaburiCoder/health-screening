"use client";
import React from "react";
import { CarouselX } from "@/components/carousel-x/carousel-x";
import LsNextButtons from "./ls-next-buttons";

import { useLifestyleController } from "./_hooks/use-lifestyle-controller";
import { useLsClear } from "./_hooks/use-ls-clear";

export default function LifestyleBody() {
  const { index, lastIndex, carouselItems, handlePrev, handleNext } =
    useLifestyleController();
  useLsClear();

  return (
    <>
      <CarouselX index={index}>{carouselItems}</CarouselX>

      <LsNextButtons
        index={index}
        lastIndex={lastIndex}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
