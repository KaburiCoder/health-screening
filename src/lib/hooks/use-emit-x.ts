import { UseEmitArgs, useEmit } from "@/socket-io/hooks/use-emit";
import { useServerCookie } from "./use-server-cookie";
import { useSelectionPatientStore } from "@/stores/selection-patient-store";
import toast from "react-hot-toast";

export const useEmitX = <TArgs extends { [key: string]: any }, TResult extends object>({ ev, onSuccess }: UseEmitArgs<TResult>) => {
  const { data, error, emitAck, isConnected, isLoading } = useEmit<TArgs, TResult>({ ev, onSuccess })
  const { user } = useServerCookie();
  const { patient } = useSelectionPatientStore();

  function emitWithAck(args: TArgs): Promise<TResult | undefined> | undefined {
    const key = args?.key ?? user?.roomKey;
    if (!key) {
      // key가 없으면 서버로 전송이 불가능하다. 조용히 종료하면 클릭 시
      // 아무 반응이 없는 것처럼 보이므로 사용자에게 원인을 알린다.
      toast.error("연결 정보가 없어 저장할 수 없습니다. 페이지를 새로고침하거나 환자를 다시 선택해주세요.");
      return;
    }
    return emitAck({ key, eiAuto: patient?.eiAuto, ...args })
  }

  return { data, error, isConnected, isLoading, emitAck: emitWithAck };
};