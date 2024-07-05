import { ReasonState } from "@/models/reason-state";
import { apiPaths } from "@/paths";
import { deleteReason } from "@/services/clickdesk/reason/delete-reason";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSayuBoxService = (item: ReasonState) => {
  const queryClient = useQueryClient();
  const { isPending, mutate: deleteMutate } = useMutation({
    mutationFn: deleteReason,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiPaths.clickdesk.reason],
      });
    },
  });

  function handleDelete(): void {
    if (confirm(`내원사유(${item.text})를 삭제 하시겠습니까?`)) {
      deleteMutate({ id: item.id });
    }
  }

  return {
    isPending,
    handleDelete,
  }
}
