'use client'
import { useServerCookie } from "@/lib/hooks/use-server-cookie";
import { paths } from "@/paths";
import { EvPaths } from "@/socket-io/ev-paths"; 
import { QnKeys, useConditionStore } from "@/stores/condition-store";
import { useQuestionStore } from "@/stores/questionnaire/question-store";
import { useRouter } from "next/navigation";
import * as sock from "health-screening-shared/interfaces.socket";
import { useQnDepressionStore } from "@/stores/questionnaire/gn-depression-store";
import { useQnCognitiveStore } from "@/stores/questionnaire/gn-cognitive-store";
import { useEmitX } from "@/lib/hooks/use-emit-x";

export const useNavQuestionnaire = () => {
  const { setAddList } = useConditionStore();
  const setGenState = useQuestionStore(state => state.setGenState);
  const setDepressionState = useQnDepressionStore(state => state.setState)
  const setCognitiveState = useQnCognitiveStore(state => state.setState)
  const { push } = useRouter();
  const { emitAck } = useEmitX<any, any>({
    ev: EvPaths.GetQuestionnaire,
    onSuccess: ({ data }) => {
      setGenState({
        ...data.history,
        ...data.smoking,
        ...data.drink,
        ...data.activity,
        ...data.addExam,
      });

      setDepressionState(data?.depression)
      setCognitiveState(data?.cognitive)

      push(paths.questionnaire);
    },
  });

  function nav(eiAuto: number, k: sock.QuestionnaireKind) {
    const isEldery = k.addList?.some(x => x === 'elderly')

    setAddList(k.addList as QnKeys[]);

    if (!k.written) return push(paths.questionnaire);

    emitAck({
      eiAuto: eiAuto,
      addExam: isEldery,
      kind: k.kind,
      type: k.type,
    });
  }

  return { nav };
};
