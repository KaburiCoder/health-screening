import { FC, HTMLAttributes } from "react";
import { ReasonState } from "../reason-body";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SayuDragCard } from "../_components/sayu-drag-card";

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  withOpacity?: boolean;
  isDragging?: boolean;
  item: ReasonState;
  index: number;
};

export const SayuSortableItem: FC<ItemProps> = (props) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <SayuDragCard
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      listeners={listeners}
      attributes={attributes}
      {...props}
      {...attributes}
    />
  );
};
