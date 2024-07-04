import React from "react";
import { SayuSortableItem } from "./sayu-sortable-item";
import { SayuAdd } from "./sayu-add";
import { ReasonState } from "@/models/reason-state";

interface Props {
  items: ReasonState[];
}
export const SayuBoxes = ({ items }: Props) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {items.map((item, index) => (
        <SayuSortableItem key={item.id} item={item} index={index} />
      ))}
      <SayuAdd />
    </div>
  );
};
