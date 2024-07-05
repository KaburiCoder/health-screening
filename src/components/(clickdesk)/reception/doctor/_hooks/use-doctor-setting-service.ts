import { DoctorWorks } from "@/models/doctor-state";
import { apiPaths } from "@/paths";
import { getDoctor } from "@/services/clickdesk/doctor/get-doctor";
import { updateDoctor } from "@/services/clickdesk/doctor/update-doctor";
import { parseAxError } from "@/shared/error-result";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

interface Args {
  id: string;
  isOpen: boolean;
}
export const useDoctorSettingService = ({ id, isOpen }: Args) => {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryFn: () => getDoctor(id),
    queryKey: [apiPaths.clickdesk.doctorId(id), isOpen],
    enabled: isOpen,
  });
  const { error: updateError, mutateAsync, isPending: isUpdatePending } = useMutation({
    mutationFn: updateDoctor,
    mutationKey: [apiPaths.clickdesk.doctorUpdate(id), isOpen],
  });
  const errResult = useMemo(() => parseAxError(updateError), [updateError]);

  async function updatesDoctor({ jinchalName, kwamokName, works }: { name?: string, jinchalName?: string, kwamokName?: string, works?: DoctorWorks }) {
    if (!data) return;

    try {
      await mutateAsync({
        id: data.id,
        jinchalName:
          jinchalName === undefined || jinchalName === data.jinchalName
            ? undefined
            : jinchalName,
        kwamokName:
          kwamokName === undefined || kwamokName === data.kwamokName
            ? undefined
            : kwamokName,
        name: name === undefined || name === data.name ? undefined : name,
        works,
      });
    } catch {
      return false;
    }

    queryClient.invalidateQueries({ queryKey: [apiPaths.clickdesk.doctor] });
    return true;
  }
  
  return {
    data,
    isPending: isPending || isUpdatePending,
    errResult,
    updatesDoctor,
  }
}