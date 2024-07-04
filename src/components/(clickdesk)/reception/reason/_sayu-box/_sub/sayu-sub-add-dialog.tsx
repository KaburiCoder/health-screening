import { GridTitle } from "@/components/grid-title";
import { InputEx } from "@/components/index-ex";
import { SaveDialog } from "@/components/save-dialog";
import { InputX } from "@/components/ui/input-x";
import { ModalProps } from "@/lib/props/modal-props";
import { ReasonState, ReasonSub } from "@/models/reason-state";
import { apiPaths } from "@/paths";
import { updateReason } from "@/services/clickdesk/reason/update-reason";
import { Button, Divider } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChildrenProps } from "kbr-nextjs-shared/props";
import { Grip, GripVertical, PlusCircle, Touchpad, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SayuSubDnd } from "./sayu-sub-dnd";

interface Props extends ModalProps {
  item: ReasonState;
}

const subInit = { text: "", seq: 0 };

export const SayuSubAddDialog = ({
  isOpen,
  item,
  onOpenChange,
  onClose,
}: Props) => {
  const queryClient = useQueryClient();
  const [subs, setSubs] = useState<ReasonSub[]>([]);

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
    const sub = subs.reduce((subs: ReasonSub[], acc: ReasonSub) => {
      const isTextExisting = subs.some(
        (sub) =>
          sub.text.trim().toLowerCase() === acc.text.trim().toLowerCase(),
      );

      if (isTextExisting || !acc.text.trim()) {
        return subs;
      } else {
        return subs.concat({ ...acc, seq: ++seq });
      }
    }, []);

    const reason: ReasonState = { ...item, sub };
    updateMutate(reason);
  }

  const arr = [];
  arr.push([]);

  useEffect(() => {
    setSubs((item.sub ?? []).concat({ ...subInit }));
  }, [item.sub, isOpen]);

  return (
    <SaveDialog
      title="내원사유 추가항목 설정"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-6" style={{ gridTemplateColumns: "8rem 1fr" }}>
        <GridTitle>내원사유</GridTitle>
        <h3 className="flex items-center text-lg font-bold">{item.text}</h3>
        {/* <InputEx readOnly defaultValue={item.text} errorMessage="" onChange={() => {}} /> */}
      </div>
      <SubDivider />

      <SayuSubDnd subs={subs} setSubs={setSubs} />

      <Button
        variant="light"
        startContent={<PlusCircle />}
        onClick={() => {
          setSubs((sub) => {
            return sub.concat({ ...subInit });
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
