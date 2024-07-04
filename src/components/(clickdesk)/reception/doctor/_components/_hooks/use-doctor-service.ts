import { apiPaths } from "@/paths";
import { deleteDoctor } from "@/services/clickdesk/doctor/delete_doctor";
import { getAllDoctors } from "@/services/clickdesk/doctor/get_all_doctors";
import { saveDoctor } from "@/services/clickdesk/doctor/save_doctor";
import { updateDoctorsSeq } from "@/services/clickdesk/doctor/update_doctors_seq";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useDoctorService = () => {
  const { data: queryData, isPending: isQueryPending } = useQuery({
    queryFn: getAllDoctors,
    queryKey: [apiPaths.clickdesk.doctor],
  });

  const {
    data: saveData,
    isPending: isSavePending,
    mutate: saveMutate,
  } = useMutation({
    mutationFn: saveDoctor,
    mutationKey: [apiPaths.clickdesk.doctor],
  });

  const {
    data: deleteData,
    isPending: isDeletePending,
    mutate: deleteMutate,
  } = useMutation({
    mutationFn: deleteDoctor,
    mutationKey: [apiPaths.clickdesk.doctor],
  });

  const { isPending: isUpdateSeqPending, mutate: updateSeqMutate } =
    useMutation({
      mutationFn: updateDoctorsSeq,
      mutationKey: [apiPaths.clickdesk.doctor],
    });

  const isPending = useMemo(
    () =>
      isSavePending || isDeletePending || isQueryPending || isUpdateSeqPending,
    [isSavePending, isDeletePending, isQueryPending],
  );

  return {
    queryData,
    saveData,
    deleteData,
    saveMutate,
    deleteMutate,
    updateSeqMutate,
    isPending
  }
}