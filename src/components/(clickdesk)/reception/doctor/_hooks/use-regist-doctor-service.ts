import { DoctorState } from "@/models/doctor-state";
import { apiPaths } from "@/paths";
import { deleteDoctor } from "@/services/clickdesk/doctor/delete-doctor";
import { getAllDoctors } from "@/services/clickdesk/doctor/get-all-doctors";
import { saveDoctor as fetchSaveDoctor } from "@/services/clickdesk/doctor/save-doctor";
import { updateDoctorsSeq } from "@/services/clickdesk/doctor/update-doctors-seq";
import { useDoctorStore } from "@/stores/clickdesk/doctor/doctor-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useRegistDoctorService = () => {
  const doctors = useDoctorStore((state) => state.doctors);
  const { data: queryData, isPending: isQueryPending } = useQuery({
    queryFn: getAllDoctors,
    queryKey: [apiPaths.clickdesk.doctor],
  });

  const {
    data: saveData,
    isPending: isSavePending,
    mutate: saveMutate,
  } = useMutation({
    mutationFn: fetchSaveDoctor,
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

  function saveDoctor(state: DoctorState) {
    const { id, ...otherState } = state;
    const nextSeq =
      doctors.length > 0 ? Math.max(...doctors.map((item) => item.seq)) + 1 : 1;
    saveMutate({ ...otherState, seq: nextSeq });
  }

  return {
    queryData,
    saveData,
    deleteData,
    saveDoctor,
    deleteMutate,
    updateSeqMutate,
    isPending
  }
}