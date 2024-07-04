import { ModalProps } from "@/lib/props/modal-props";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ChildrenProps } from "kbr-nextjs-shared/props";
import React from "react";

interface SaveDialogProps extends ModalProps, ChildrenProps {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isDisabled?: boolean;
}
export const SaveDialog = ({
  title,
  isOpen,
  isDisabled,
  children,
  onOpenChange,
  onSubmit,
}: SaveDialogProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <form onSubmit={onSubmit}>
              <ModalBody className="relative max-h-[35rem] overflow-y-auto">
                {children}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  닫기
                </Button>
                <Button type="submit" color="primary" isDisabled={isDisabled}>
                  저장
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
