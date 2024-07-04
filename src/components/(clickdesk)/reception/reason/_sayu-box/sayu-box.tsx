import React, { CSSProperties, HTMLAttributes, useState } from "react";
import { ReasonState } from "../reason-body";
import { SayuHeader } from "./sayu-header";
import { SayuBottomButtons } from "./sayu-bottom-buttons";
import { SayuSubList } from "./sayu-sub-list";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { DraggableAttributes } from "@dnd-kit/core";
import { cn } from "@nextui-org/react";

export interface SayuBoxProps {
  item: ReasonState;
  index?: number;
  withOpacity?: boolean;
  isDragging?: boolean;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
  style?: CSSProperties;
}

export const SayuBox = React.forwardRef<HTMLDivElement, SayuBoxProps>(
  (
    {
      listeners,
      attributes,
      withOpacity,
      isDragging,
      style,
      ...props
    }: SayuBoxProps,
    ref,
  ) => {
    const [isHover, setIsHover] = useState(false);

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
        {...props}
        {...listeners}
        {...attributes}
        style={inlineStyles}
      >
        <div
          className="flex h-full flex-col justify-between overflow-hidden rounded bg-white shadow"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <SayuHeader {...props} />
          <SayuSubList sub={props.item.sub} />
          <SayuBottomButtons
            className={!isDragging && isHover ? "" : "opacity-0"}
          />
        </div>
      </div>
    );
  },
);
