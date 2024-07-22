"use client";
import { ClassNameProps } from "kbr-nextjs-shared/props";
import React from "react";
import Lottie from "react-lottie-player";
import warning from "@/public/lotties/warning-ani.json";

export function LottieWarning({
  className,
  loop = true,
}: ClassNameProps & { loop?: boolean }) {
  return (
    <Lottie className={className} animationData={warning} play loop={loop} />
  );
}
