import React from "react";
import { SayuSortableItem } from "./sayu-sortable-item";
import { SayuAdd } from "./sayu-add";
import { ReasonState } from "@/models/reason-state";
import { cn } from "@/lib/utils";

interface Props {
  items: ReasonState[];
}
export const SayuBoxes = ({ items }: Props) => {
  return (
    <div
      className={cn(
        "grid gap-2",
        "grid-cols-5",
        "md2:grid-cols-3",
        "lg2:grid-cols-4",
        "xl2:grid-cols-5",
        "3xl:grid-cols-6",
      )}
    >
      {items.map((item, index) => (
        <SayuSortableItem key={item.id} item={item} index={index} />
      ))}
      <SayuAdd />
    </div>
  );
};
