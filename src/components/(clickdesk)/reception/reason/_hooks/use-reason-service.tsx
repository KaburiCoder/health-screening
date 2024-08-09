import { apiPaths } from "@/paths";
import { getReasonsByDoctorId } from "@/services/clickdesk/reason/get-reasons-by-doctor-id";
import { updateAllReasons } from "@/services/clickdesk/reason/update-all-reasons";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface Args {
  doctorId: string;
}

export const useReasonService = ({ doctorId }: Args) => {
  const { data: queryData, isPending: isQueryPending } = useQuery({
    queryFn: () => getReasonsByDoctorId(doctorId),
    queryKey: [apiPaths.clickdesk.reason, doctorId],
  });

  const { mutate: updateAllMutate, isPending: isUpdatePending } = useMutation({
    mutationFn: updateAllReasons,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    queryData,
    updateAllMutate,
    isPending: isQueryPending || isUpdatePending,
  };
};
