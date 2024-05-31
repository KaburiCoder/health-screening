"use client";
import * as sock from "health-screening-shared/interfaces.socket";
import { useSelectionPatientStore } from "@/stores/selection-patient-store";
import { Button, Card, Chip, useDisclosure } from "@nextui-org/react";
import { useNavQuestionnaire } from "./_hooks/use-nav-questionnaire";
import { useNavLifestyle } from "./_hooks/use-nav-lifestyle";
interface PatientCardProps {
  data: sock.ReceptionPatient;
}

export function PatientCard({ data }: PatientCardProps) {
  const { name, birthday, targetName, kinds, diagnose, status } = data;
  const setPatient = useSelectionPatientStore((state) => state.setPatient);
  const { nav } = useNavQuestionnaire();
  const { isLoading, lifestyleModal, openLifestyleModal } = useNavLifestyle({
    eiAuto: data.eiAuto,
    status,
    diagnose,
  });

  function handlePush(k: sock.QuestionnaireKind): void {
    setPatient(data);
    if (
      k.kind === sock.EQuestionnaireKind.일반검진 &&
      k.type === sock.EQuestionnaireType.일반
    ) {
      nav(data.eiAuto, k);
    }

    if (k.kind === sock.EQuestionnaireKind.생활습관) {
      const gen = kinds.find(
        (kind) =>
          kind.kind === sock.EQuestionnaireKind.일반검진 &&
          k.type === sock.EQuestionnaireType.일반,
      );
      if (!gen?.written) {
        return alert("일반검진 문진표를 먼저 작성해야합니다.");
      }
      openLifestyleModal();
    }

    if (
      k.kind === sock.EQuestionnaireKind.구강검진 &&
      k.type === sock.EQuestionnaireType.일반
    ) {
    }
  }

  return (
    <Card className="flex flex-col justify-between gap-4 p-4">
      {lifestyleModal}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <div>
          <p className="text-sm font-bold uppercase">{birthday}</p>
          <small className="text-default-500">{targetName}</small>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {kinds.map((k, i) => {
          const written = getWritten(k, status);
          const { isEldery, isCognitive, isDepression } = getAddExams(k);
          return (
            <div
              key={i}
              className="flex items-center justify-between border-b border-purple-200 p-2"
            >
              <div className="flex gap-1">
                <h3 className="text-base">{k.name}</h3>
                {isEldery && <Chip size="sm">노인</Chip>}
                {isCognitive && <Chip size="sm">인지</Chip>}
                {isDepression && <Chip size="sm">우울</Chip>}
              </div>
              <div className="flex items-center gap-2">
                {k.isReceived && (
                  <Chip size="sm" color="success" variant="faded">
                    접수
                  </Chip>
                )}
                <Button
                  isLoading={isLoading}
                  color={written ? "success" : "primary"}
                  variant="flat"
                  onClick={handlePush.bind(null, k)}
                >
                  {written ? "수정" : "작성"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function getWritten(
  k: sock.QuestionnaireKind,
  status: sock.QuestionnaireStatus,
): boolean {
  if (k.kind === sock.EQuestionnaireKind.일반검진) {
    return status.generalQn;
  }

  if (k.kind === sock.EQuestionnaireKind.생활습관) {
    return Object.values(status.lifestyle).some((x) => x);
  }

  return false;
}

function getAddExams(k: sock.QuestionnaireKind) {
  const isEldery = k.addList?.some((x) => x === "elderly");
  const isCognitive = k.addList?.some((x) => x === "cognitive");
  const isDepression = k.addList?.some((x) => x === "depression");

  return {
    isEldery,
    isCognitive,
    isDepression,
  };
}
