import React from "react";
import { SayuSub } from "./sayu-sub";
import { ReasonSub } from "@/models/reason-state";

export const SayuSubList = ({ sub }: { sub: ReasonSub[] | undefined }) => {
  if (!sub) return <></>;

  return (
    <ul className="flex-1 px-4 pb-2">
      {sub.map((sub) => (
        <SayuSub key={sub.text} text={sub.text} />
      ))}
    </ul>
  );
};
