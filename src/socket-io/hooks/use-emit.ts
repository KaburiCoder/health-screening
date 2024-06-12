import { useSocketIO } from "kbr-nextjs-shared/hooks";
import { EvPaths } from "../ev-paths";
import { useState } from "react";
import toast from "react-hot-toast";

export interface UseEmitArgs<TResult> {
  ev: EvPaths;
  onSuccess?: (value: TResult) => void;
}

export const useEmit = <TArgs, TResult extends object>({ ev, onSuccess }: UseEmitArgs<TResult>) => {
  const { socket, isConnected } = useSocketIO();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<TResult>();
  const [error, setError] = useState<Error>();

  async function emitAck(args: TArgs) {
    if (!isConnected) return;

    setIsLoading(true);
    try {
      const result = (await socket?.timeout(10000).emitWithAck(ev, args)) as TResult;
      setData(result);
      if ('status' in result
        && 'message' in result
        && result.status === 'error'
        && typeof result.message === 'string'
      ) {
        throw new Error(result.message)
      }
      onSuccess?.(result);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        toast.error(`알 수 없는 에러 발생: ${(error as any)?.message}`)
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { data, isConnected, isLoading, error, emitAck };
};