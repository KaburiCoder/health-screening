import { apiPaths } from "@/paths";
import { getAllReasons } from "@/services/clickdesk/reason/get-all-reasons";
import { updateAllReasons } from "@/services/clickdesk/reason/update-all-reasons";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useReasonService = () => {
  const { data: queryData, isPending: isQueryPending } = useQuery({
    queryFn: getAllReasons,
    queryKey: [apiPaths.clickdesk.reason],
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
