import React from "react";
import { SayuBoxProps } from "./sayu-box";
import { Chip } from "@nextui-org/react";

export const SayuHeader = ({
  attributes,
  listeners,
  item,
  index,
}: SayuBoxProps) => {
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
