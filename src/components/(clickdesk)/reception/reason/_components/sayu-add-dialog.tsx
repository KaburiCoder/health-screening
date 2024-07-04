import { SaveDialog } from "@/components/save-dialog";
import { ModalProps } from "@/lib/props/modal-props";
import { Input } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";

interface Props extends ModalProps {}

export const SayuAddDialog = ({ isOpen, onOpenChange, onClose }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);
  return (
    <SaveDialog
      title="내원사유 추가"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmit={(e) => {
        e.preventDefault();
        onClose?.();
      }}
    >
      <Input ref={inputRef} autoFocus />
    </SaveDialog>
  );
};
