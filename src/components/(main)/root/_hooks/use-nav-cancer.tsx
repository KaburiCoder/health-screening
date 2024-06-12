import { useEmitX } from "@/lib/hooks/use-emit-x";
import { SocketResponse } from "@/lib/types/socket-response";
import { paths } from "@/paths";
import { EvPaths } from "@/socket-io/ev-paths";
import { useCancerStore } from "@/stores/cancer/cancer-store";
import { QuestionnaireKind } from "health-screening-shared/interfaces.socket";
import { useRouter } from "next/navigation";

export const useNavCancer = () => {
  const { push } = useRouter();
  const setState = useCancerStore((state) => state.setState);
  const setSex = useCancerStore((state) => state.setSex);
  const { emitAck } = useEmitX<any, SocketResponse<any>>({
    ev: EvPaths.GetCancer,
  });
  async function nav(eiAuto: number, k: QuestionnaireKind, sex: string) {
    if (!k.written) {
      setSex(sex as any);
      return push(paths.cancer);
    }

    const response = await emitAck({ eiAuto });
    const { status, data } = response || {};
    if (status === "success") {
      setState({ ...data, sex });
      push(paths.cancer);
    }
  }

  return { nav };
};
