import { Dot, X } from "lucide-react";
import React, { useState } from "react";

interface Props {
  text: string;
}
export const SayuSub = ({ text }: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <li
      className="flex items-center justify-between"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex items-center">
        <Dot />
        {text}
      </div>
      {isHover && (
        <X
          className="h-4 w-4 rounded-full bg-red-300 p-[2px] text-white hover:cursor-pointer"
          onClick={() => {
            alert(text);
          }}
        />
      )}
    </li>
  );
};
