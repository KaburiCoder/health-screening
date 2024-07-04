import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import React, { CSSProperties, useState } from "react";
import { Chip } from "@nextui-org/react";
import { ReasonState, ReasonSub } from "../reason-body";
import { SayuSub } from "../_sayu-box/sayu-sub";
import { ClassNameProps } from "kbr-nextjs-shared/props";
import { DndProps } from "./sayu-drag-card";

interface Props extends DndProps {
  index?: number;
  item: ReasonState;
  style?: CSSProperties;
}
export default function SayuBox({ style, ...props }: Props) {
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

const SayuHeader = ({ attributes, listeners, item, index }: Props) => {
  return (
    <div
      className="flex items-center justify-between p-2 text-lg font-bold"
      {...attributes}
      {...listeners}
    >
      <span className="border-l-3 border-l-amber-500 pl-4 text-amber-600">
        {item.text}
      </span>
      {index !== undefined && (
        <Chip className="text-white" color="warning">
          {index + 1}
        </Chip>
      )}
    </div>
  );
};

const SayuSubList = ({ sub }: { sub: ReasonSub[] | undefined }) => {
  if (!sub) return <></>;

  return (
    <ul className="px-4 pb-2">
      {sub.map((sub) => (
        <SayuSub key={sub.text} text={sub.text} />
      ))}
    </ul>
  );
};
interface BottomButtonsProps extends ClassNameProps {}
const SayuBottomButtons = ({ className }: BottomButtonsProps) => {
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
