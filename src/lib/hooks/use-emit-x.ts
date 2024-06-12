import { UseEmitArgs, useEmit } from "@/socket-io/hooks/use-emit";
import { useServerCookie } from "./use-server-cookie";
import { useSelectionPatientStore } from "@/stores/selection-patient-store";

export const useEmitX = <TArgs extends { [key: string]: any }, TResult extends object>({ ev, onSuccess }: UseEmitArgs<TResult>) => {
  const { data, error, emitAck, isConnected, isLoading } = useEmit<TArgs, TResult>({ ev, onSuccess })
  const { user } = useServerCookie();
  const { patient } = useSelectionPatientStore();

  function emitWithAck(args: TArgs): Promise<TResult | undefined> | undefined {
    const key = args?.key ?? user?.roomKey;    
    if (!key) return;
    return emitAck({ key, eiAuto: patient?.eiAuto, ...args })
  }

  return { data, error, isConnected, isLoading, emitAck: emitWithAck };
};