import { cn } from "@/lib/utils";
import { ClassNameProps } from "kbr-nextjs-shared/props";
import { Plus, Trash2 } from "lucide-react";
import React from "react";

export interface BottomButtonsProps extends ClassNameProps {}

export const SayuBottomButtons = ({ className }: BottomButtonsProps) => {
  return (
    <div className={cn("flex gap-[1px] transition-all", className)}>
      <div
        className="flex-center flex-1 bg-amber-500 text-white"
        onClick={() => {
          console.log("click");
        }}
      >
        <Plus />
      </div>
      <div className="flex-center flex-1 bg-amber-500 text-white">
        <Trash2 />
      </div>
    </div>
  );
};
