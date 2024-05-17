import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CheckboxGroup,
} from "@nextui-org/react";
import { ChildrenProps } from "kbr-nextjs-shared/props";
import BigCheckBox from "@/components/big-check-box";
import sock from "health-screening-shared/interfaces.socket";

interface Props extends ChildrenProps {
  diagnose: sock.QuestionnaireDiagnose;
  isOpen: boolean;
  onOpenChange: () => void;
}

function GetDiagnoseArray(diagnose: sock.QuestionnaireDiagnose) {
  const keys: string[] = [];
  for (const key in diagnose) {
    if ((diagnose as any)[key]) {
      keys.push(key);
    }
  }

  return keys;
}

export default function LifestyleSelectModal({
  diagnose,
  isOpen,
  onOpenChange,
}: Props) {
  const diagnoses = GetDiagnoseArray(diagnose);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              생활습관 문진표
            </ModalHeader>
            <ModalBody>
              <div>작성할 문진표를 선택하세요.</div>
              <CheckboxGroup defaultValue={diagnoses}>
                <BigCheckBox value={"smoking"} isDisabled={!diagnose.smoking}>
                  흡연
                </BigCheckBox>
                <BigCheckBox value={"drinking"} isDisabled={!diagnose.drinking}>
                  음주
                </BigCheckBox>
                <BigCheckBox value={"exercise"}>운동</BigCheckBox>
                <BigCheckBox value={"nutrition"}>영양</BigCheckBox>
                <BigCheckBox value={"overweight"}>비만</BigCheckBox>
              </CheckboxGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                닫기
              </Button>
              <Button color="primary" onPress={onClose}>
                선택
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}