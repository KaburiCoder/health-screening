import { cn, useDisclosure } from "@nextui-org/react";
import { PlusCircle } from "lucide-react";
import React from "react";
import { SayuAddDialog } from "./sayu-add-dialog";

interface Props {
  onClick: () => void;
}
export const SayuAdd = ({ onClick }: Props) => {
  const disclosure = useDisclosure();
  return (
    <>
      <SayuAddDialog {...disclosure} />
      <div
        className={cn(
          "flex-center gap-2 rounded border-1 border-slate-300 text-slate-500",
          "hover:cursor-pointer hover:bg-slate-200",
        )}
        onClick={disclosure.onOpen}
      >
        <PlusCircle />
        <span className="font-bold">추가하기</span>
      </div>
    </>
  );
};
