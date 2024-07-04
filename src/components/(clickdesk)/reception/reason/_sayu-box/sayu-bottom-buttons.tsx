import { cn } from "@/lib/utils";
import { ReasonState } from "@/models/reason-state";
import { apiPaths } from "@/paths";
import { deleteReason } from "@/services/clickdesk/reason/delete-reason";
import { useDisclosure } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChildrenProps, ClassNameProps } from "kbr-nextjs-shared/props";
import { LoaderCircle, Plus, Trash2 } from "lucide-react";
import React from "react";
import { SayuSubAddDialog } from "./_sub/sayu-sub-add-dialog";

export interface BottomButtonsProps extends ClassNameProps {
  item: ReasonState;
  onClick: () => void;
}

export const SayuBottomButtons = ({
  item,
  className,
  onClick,
}: BottomButtonsProps) => {
  const disclosure = useDisclosure();
  const queryClient = useQueryClient();
  const { isPending, mutate: deleteMutate } = useMutation({
    mutationFn: deleteReason,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiPaths.clickdesk.reason] });
    },
  });

  function handleDelete(): void {
    onClick();
    if (confirm(`내원사유(${item.text})를 삭제 하시겠습니까?`)) {
      deleteMutate({ id: item.id });
    }
  }

  function handleAddSub(): void {
    onClick();
    disclosure.onOpen();
  }

  return (
    <div className={cn("flex gap-[1px] transition-all", className)}>
      <SayuSubAddDialog {...disclosure} item={item} />
      <Wrapper isPending={isPending} onClick={handleAddSub}>
        <Plus />
      </Wrapper>
      <Wrapper isPending={isPending} onClick={handleDelete}>
        <Trash2 />
      </Wrapper>
    </div>
  );
};

const Wrapper = ({
  isPending,
  children,
  onClick,
}: ChildrenProps & { isPending: boolean; onClick: () => void }) => {
  return (
    <button
      className={cn(
        "flex-center flex-1 bg-amber-500 py-1 text-white",
        "hover:cursor-pointer hover:bg-amber-600",
        "disabled:bg-slate-300 hover:disabled:bg-slate-300",
      )}
      onClick={onClick}
      disabled={isPending}
    >
      {isPending ? <LoaderCircle className="animate-spin" /> : children}
    </button>
  );
};
