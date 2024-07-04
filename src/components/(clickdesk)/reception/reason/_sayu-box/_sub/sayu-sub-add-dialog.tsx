import { GridTitle } from "@/components/grid-title";
import { SaveDialog } from "@/components/save-dialog";
import { ModalProps } from "@/lib/props/modal-props";
import { ReasonState, ReasonSub } from "@/models/reason-state";
import { apiPaths } from "@/paths";
import { updateReason } from "@/services/clickdesk/reason/update-reason";
import { Button, Divider } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Grip, GripVertical, PlusCircle, Touchpad, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
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
  const queryClient = useQueryClient();
  const [subs, setSubs] = useState<ReasonState[]>([]);

  const {
    data: updateData,
    mutate: updateMutate,
    error: updateError,
  } = useMutation({
    mutationFn: updateReason,
    mutationKey: [isOpen],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiPaths.clickdesk.reason] });
      onClose?.();
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    let seq: number = 0;
    const sub = subs.reduce((subs: ReasonSub[], acc: ReasonState) => {
      const isTextExisting = subs.some(
        (sub) =>
          sub.text.trim().toLowerCase() === acc.text.trim().toLowerCase(),
      );

      if (isTextExisting || !acc.text.trim()) {
        return subs;
      } else {
        const { id, ...sub } = acc;
        return subs.concat({ ...sub, seq: ++seq });
      }
    }, []);

    const reason: ReasonState = { ...item, sub };
    updateMutate(reason);
  }

  useEffect(() => {
    const stateList = ReasonSub.toStateList(item.sub).concat(
      ReasonSub.createState(item.sub),
    );

    setSubs(stateList);
  }, [item.sub, isOpen]);

  return (
    <SaveDialog
      title="내원사유 추가항목 설정"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
    >
      <h3 className="flex-center items-center py-2 text-2xl font-bold">
        {item.text}
      </h3>
      {/* <div className="grid gap-6" style={{ gridTemplateColumns: "8rem 1fr" }}>
        <GridTitle>내원사유 :</GridTitle>
        
      </div> */}
      <SubDivider />

      <SayuSubDnd subs={subs} setSubs={setSubs} />

      <Button
        className="min-h-12"
        variant="light"
        startContent={<PlusCircle />}
        onClick={() => {
          setSubs((subs) => {
            return subs.concat(ReasonSub.createState(subs));
          });
        }}
      >
        추가
      </Button>
    </SaveDialog>
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
