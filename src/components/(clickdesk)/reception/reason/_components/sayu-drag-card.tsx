import { cn } from "@nextui-org/react";
import { CSSProperties, HTMLAttributes, forwardRef } from "react";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { DraggableAttributes } from "@dnd-kit/core";
import { ReasonState } from "../reason-body";
import SayuBox from "./sayu-box";

export type ItemProps = HTMLAttributes<HTMLDivElement> &
  DndProps & {
    index?: number;
    withOpacity?: boolean;
    item: ReasonState;
  };

export interface DndProps {
  isDragging?: boolean;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
}
export const SayuDragCard = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      index,
      withOpacity,
      isDragging,
      style,
      className,
      listeners,
      attributes,
      item,
      ...props
    },
    ref,
  ) => {
    const inlineStyles: CSSProperties = {
      transformOrigin: "50% 50%",
      boxShadow: isDragging
        ? "rgb(255 150 68 / 50%) 0px 0px 0px 2px, rgb(255 150 81 / 70%) 0px 1px 3px 0px"
        : "rgb(255 150 68 / 30%) 0px 0px 0px 1px, rgb(255 150 81 / 50%) 0px 1px 3px 0px",
      ...style,
    };

    return (
      <div
        className={cn(
          "flex flex-col overflow-hidden rounded bg-white shadow",
          withOpacity ? "opacity-50" : "",
          isDragging ? "cursor-grabbing" : "cursor-default",
        )}
        ref={ref}
        style={inlineStyles}
        {...props}
      >
        <SayuBox
          index={index}
          item={item}
          listeners={listeners}
          attributes={attributes}
          isDragging={isDragging}
        />
        {/* {id} */}
      </div>
    );
  },
);
