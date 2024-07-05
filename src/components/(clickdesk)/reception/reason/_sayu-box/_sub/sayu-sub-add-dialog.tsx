import { SaveDialog } from "@/components/save-dialog";
import { ModalProps } from "@/lib/props/modal-props";
import { ReasonState, ReasonSub } from "@/models/reason-state";
import { Button } from "@nextui-org/react";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSayuSubAddDialogService } from "./_hooks/use-sayu-sub-add-dialog-service";
import { SayuSubDnd } from "./sayu-sub-dnd";

interface Props extends ModalProps {
  item: ReasonState;
}

export const SayuSubAddDialog = ({
  isOpen,
  item,
  onOpenChange,
  onClose,
}: Props) => {
  const { updateReason } = useSayuSubAddDialogService({ isOpen, onClose });
  const [reasonStates, setReasonStates] = useState<ReasonState[]>([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    updateReason(item, reasonStates);
  }

  useEffect(() => {
    const stateList = ReasonSub.toStateList(item.sub).concat(
      ReasonSub.createState(item.sub),
    );

    setReasonStates(stateList);
  }, [item.sub, isOpen]);

  return (
    <SaveDialog
      title="내원사유 추가항목 설정"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
    >
      <ItemText text={item.text} />
      <SubDivider />
      <SayuSubDnd subs={reasonStates} setSubs={setReasonStates} />
      <Button
        className="min-h-12"
        variant="light"
        startContent={<PlusCircle />}
        onClick={() => {
          setReasonStates((subs) => {
            return subs.concat(ReasonSub.createState(subs));
          });
        }}
      >
        추가
      </Button>
    </SaveDialog>
  );
};

const ItemText = ({ text }: { text: string }) => {
  return (
    <h3 className="flex-center items-center py-2 text-2xl font-bold">{text}</h3>
  );
};

const SubDivider = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="h-[1px] flex-1 bg-slate-300"></div>
      <span className="font-bold text-slate-500">하위항목</span>
      <div className="h-[1px] flex-1 bg-slate-300"></div>
    </div>
  );
};
