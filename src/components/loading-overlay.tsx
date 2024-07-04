import React from "react";
import { LottieLoading } from "./lottie/lottie-loading";
import { ClassNameProps } from "kbr-nextjs-shared/props";
import { cn } from "@/lib/utils";

export const LoadingOverlay = ({ className }: ClassNameProps) => {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 z-[500] h-full w-full bg-slate-500/5",
        className,
      )}
    >
      <LottieLoading className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};
