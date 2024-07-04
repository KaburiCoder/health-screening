import { Dot, X } from "lucide-react";
import React, { useState } from "react";

interface Props {
  text: string;
}
export const SayuSub = ({ text }: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <li
      className="relative flex items-center"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex items-center">
        <Dot className="min-w-6"/>
        {text}
      </div>
      {isHover && (
        <X
          className="absolute right-0 h-4 w-4 rounded-full bg-rose-300/95 p-[2px] text-white hover:cursor-pointer"
          onClick={() => {
            alert(text);
          }}
        />
      )}
    </li>
  );
};
