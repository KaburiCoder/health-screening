"use client";
import React, { useEffect } from "react";
import CancerN1 from "./cancer-n1";
import CancerN2 from "./cancer-n2";
import CancerN3 from "./cancer-n3";
import CancerN4 from "./cancer-n4";
import CancerN5 from "./cancer-n5";
import CancerN6 from "./cancer-n6";
import CancerN7 from "./cancer-n7";
import CancerN8 from "./cancer-n8";
import { CancerN9 } from "./cancer-n9";
import { CancerN10 } from "./cancer-n10";
import { CancerN11 } from "./cancer-n11";
import { CancerN12 } from "./cancer-n12";
import { CancerN13 } from "./cancer-n13";
import { CancerN14 } from "./cancer-n14";
import { CancerN15 } from "./cancer-n15";
import { CancerSubmit } from "./cancer-submit";
import { useCancerStore } from "@/stores/cancer/cancer-store";
import { ErrorBoundary } from "react-error-boundary";
import { useCancerClear } from "./_hooks/use-cancer-clear";

export default function CancerBody() {
  const sex = useCancerStore((state) => state.sex);
  const { clearAll } = useCancerClear();

  useEffect(() => {
    return clearAll;
  }, []);

  return (
    <>
      <CancerN1 />
      <CancerN2 />
      <CancerN3 />
      <CancerN4 />
      <CancerN5 />
      <CancerN6 />
      <CancerN7 />
      <CancerN8 />
      {sex === "F" && (
        <>
          <CancerN9 />
          <CancerN10 />
          <CancerN11 />
          <CancerN12 />
          <CancerN13 />
          <CancerN14 />
          <CancerN15 />
        </>
      )}
      <CancerSubmit />
    </>
  );
}
