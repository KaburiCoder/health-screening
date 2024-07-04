"use client";
import { ClassNameProps } from "kbr-nextjs-shared/props";
import React from "react";
import Lottie from "react-lottie-player";
import loading from "@/public/lotties/loading-ani.json";

export function LottieLoading({ className }: ClassNameProps) {
  return <Lottie className={className} animationData={loading} play />;
}
