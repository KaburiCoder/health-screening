import { SaveDialog } from "@/components/save-dialog";
import { InputX } from "@/components/ui/input-x";
import { ModalProps } from "@/lib/props/modal-props";
import React, { useEffect, useRef } from "react";
import { useSayuAddDialogService } from "./_hooks/use-sayu-add-dialog-service";

interface Props extends ModalProps {}

export const SayuAddDialog = ({ isOpen, onOpenChange, onClose }: Props) => {
  const { errorMessage, saveReason } = useSayuAddDialogService({
    isOpen,
    onClose,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    saveReason(inputRef.current?.value);
  }

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  return (
    <SaveDialog
      title="내원사유 추가"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
    >
      <InputX ref={inputRef} autoFocus errorMessage={errorMessage} />
    </SaveDialog>
  );
};
