import { apiPaths } from '@/paths';
import { SaveReasonArgs, saveReason as fetchSaveReason } from '@/services/clickdesk/reason/save-reason';
import { parseAxError } from '@/shared/error-result';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useMemo } from 'react'

interface Args {
  isOpen: boolean;
  onClose: (() => void) | undefined;
}
export const useSayuAddDialogService = ({ isOpen, onClose }: Args) => {
  const queryClient = useQueryClient();
  const { error, mutate } = useMutation({
    mutationFn: fetchSaveReason,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiPaths.clickdesk.reason] });
      onClose?.();
    },
    mutationKey: [isOpen],
  });

  const errorMessage = useMemo(() => {
    const axError = parseAxError(error);
    return axError?.error?.text as string || axError?.message;
  }, [error]);

  function saveReason(args: SaveReasonArgs): void {
    mutate(args);
  }

  return {
    errorMessage,
    saveReason,
  }
}
