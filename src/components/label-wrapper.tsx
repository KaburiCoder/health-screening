import { cn } from "@/lib/utils";
import { ChildrenClassNameProps, ChildrenProps } from "kbr-nextjs-shared/props";
import React from "react";

interface Props extends ChildrenClassNameProps {
  start?: React.ReactNode;
  end?: React.ReactNode;
}
export default function LabelWrapper({
  start,
  end,
  children,
  className,
}: Props) {
  return (
    <label
      className={cn("flex items-center gap-2 whitespace-nowrap", className)}
    >
      {start}
      {children}
      {end}
    </label>
  );
}
