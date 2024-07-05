import { ReasonState } from '@/models/reason-state';
import { apiPaths } from '@/paths';
import { updateReason } from '@/services/clickdesk/reason/update-reason';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface Args {
  isOpen: boolean;
  onClose: (() => void) | undefined;
}

export const useSayuSubAddDialogService = ({ isOpen, onClose }: Args) => {
  const queryClient = useQueryClient();
  const { mutate: updateMutate } = useMutation({
    mutationFn: updateReason,
    mutationKey: [isOpen],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiPaths.clickdesk.reason] });
      onClose?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function update(item: ReasonState, reasonStates: ReasonState[]) {
    const subs = ReasonState.toReasonSubs(reasonStates);
    const reason: ReasonState = { ...item, subs };
    updateMutate(reason);
  }

  return {
    updateReason: update,
  }
}
