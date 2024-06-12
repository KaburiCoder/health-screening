"use client";
import { useEmitX } from "@/lib/hooks/use-emit-x";
import { EvPaths } from "@/socket-io/ev-paths";
import LifestyleSelectModal from "../lifestyle-select-modal";
import { useDisclosure } from "@nextui-org/react";
import { LifestyleKeys, useConditionStore } from "@/stores/condition-store";
import {
  QuestionnaireDiagnose,
  QuestionnaireStatus,
} from "health-screening-shared/interfaces.socket";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import { useLsSmokingStore } from "@/stores/lifestyle/ls-smoking-store";
import { useLsDrinkingStore } from "@/stores/lifestyle/ls-drinking-store";
import { useLsExerciseStore } from "@/stores/lifestyle/ls-exercise-store";
import { useLsNutritionStore } from "@/stores/lifestyle/ls-nutrition-store";
import { useLsOverweightStore } from "@/stores/lifestyle/ls-overweight-store";

interface Args {
  eiAuto: number;
  status: QuestionnaireStatus;
  diagnose: QuestionnaireDiagnose;
}

export const useNavLifestyle = ({ eiAuto, status, diagnose }: Args) => {
  const { push } = useRouter();
  const setSmokingState = useLsSmokingStore((state) => state.setState);
  const setDrinkingState = useLsDrinkingStore((state) => state.setState);
  const setExerciseState = useLsExerciseStore((state) => state.setState);
  const setNutritionState = useLsNutritionStore((state) => state.setState);
  const setOverweightState = useLsOverweightStore((state) => state.setState);

  const { isLoading, emitAck } = useEmitX({
    ev: EvPaths.GetLifestyle,
    onSuccess: ({ status, data }: any) => {
      if (status === "success") {
        if (data?.smoking) setSmokingState(data.smoking);
        if (data?.drinking) setDrinkingState(data.drinking);
        if (data?.exercise) setExerciseState(data.exercise);
        if (data?.nutrition) setNutritionState(data.nutrition);
        if (data?.overweight) setOverweightState(data.overweight);

        push(paths.lifestyle);
      }
    },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const setSelectedItems = useConditionStore(
    (state) => state.setSelectedLifestyles,
  );

  const lifestyleModal = (
    <LifestyleSelectModal
      status={status}
      diagnose={diagnose}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSelect={handleLifestyleSelect}
    />
  );

  function handleLifestyleSelect(value: LifestyleKeys[]): void {
    setSelectedItems(value);
    emitAck({
      eiAuto,
      lifestyleKeys: value,
    });
  }

  return {
    isLoading,
    lifestyleModal,
    openLifestyleModal: onOpen,
  };
};
