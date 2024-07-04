import React from "react";
import { ReasonSub } from "../reason-body";
import { SayuSub } from "./sayu-sub";

export const SayuSubList = ({ sub }: { sub: ReasonSub[] | undefined; }) => {
  if (!sub) return <></>;

  return (
    <ul className="px-4 pb-2">
      {sub.map((sub) => (
        <SayuSub key={sub.text} text={sub.text} />
      ))}
    </ul>
  );
};
