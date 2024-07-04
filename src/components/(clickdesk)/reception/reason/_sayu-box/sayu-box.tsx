import React, { CSSProperties, useState } from "react";
import { ReasonState } from "../reason-body";
import { DndProps } from "../_components/sayu-drag-card";
import { SayuHeader } from "./sayu-header";
import { SayuBottomButtons } from "./sayu-bottom-buttons";
import { SayuSubList } from "./sayu-sub-list";

export interface SayuBoxProps extends DndProps {
  index?: number;
  item: ReasonState;
  style?: CSSProperties;
}
export default function SayuBox({ style, ...props }: SayuBoxProps) {
  const { isDragging, item } = props;
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      style={style}
      className="flex h-full flex-col justify-between overflow-hidden rounded bg-white shadow"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <SayuHeader {...props} />
      <SayuSubList sub={item.sub} />
      <SayuBottomButtons
        className={!isDragging && isHover ? "" : "opacity-0"}
      />
    </div>
  );
}
