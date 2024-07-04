import { SaveDialog } from "@/components/save-dialog";
import { InputX } from "@/components/ui/input-x";
import { ModalProps } from "@/lib/props/modal-props";
import { apiPaths } from "@/paths";
import { saveReason } from "@/services/clickdesk/reason/save-reason";
import { parseAxError } from "@/shared/error-result";
import { Input } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef } from "react";

interface Props extends ModalProps {}

export const SayuAddDialog = ({ isOpen, onOpenChange, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { data, error, mutate } = useMutation({
    mutationFn: saveReason,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiPaths.clickdesk.reason] });
      onClose?.();
    },
    mutationKey: [isOpen],
  });
  const axError = useMemo(() => parseAxError(error), [error]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    mutate({ text: inputRef.current?.value ?? "" });
  }

  console.log("error", error);
  console.log("data", data);

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
      <InputX
        ref={inputRef}
        autoFocus
        errorMessage={axError?.error?.text || axError?.message}
      />
    </SaveDialog>
  );
};
