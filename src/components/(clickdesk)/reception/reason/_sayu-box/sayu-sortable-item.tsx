import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SayuBox } from "./sayu-box";
import { ReasonState } from "@/models/reason-state";

interface Props {
  item: ReasonState;
  index: number;
}

export const SayuSortableItem: FC<Props> = ({ item, index }) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition || undefined,
  };

  return (
    <SayuBox
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      listeners={listeners}
      attributes={attributes}
      item={item}
      index={index}
    />
  );
};
