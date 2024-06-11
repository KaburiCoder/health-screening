import { useEmitX } from "@/lib/hooks/use-emit-x";
import {
  SaveQuestionnaireArgs,
  SaveQuestionnaireResult,
} from "health-screening-shared/interfaces.socket";
import { EvPaths } from "@/socket-io/ev-paths";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";

export const useQnSave = () => {
  const { push } = useRouter()
  const { isLoading, emitAck } = useEmitX<
    Partial<SaveQuestionnaireArgs>,
    SaveQuestionnaireResult
  >({
    ev: EvPaths.SaveQuestionnaire,
    onSuccess: ({ status, message }) => {
      if (status === "error") {
        return toast.error(message ?? "알 수 없는 에러가 발생했습니다.");
      }

      push(paths.success("문진표"));
    },
  });

  return { isLoading, emitAck }
}