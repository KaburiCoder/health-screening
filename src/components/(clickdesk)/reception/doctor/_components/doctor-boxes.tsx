"use client";
import React, { useEffect } from "react";
import { DoctorCard } from "./doctor-card";
import { useEmitX } from "@/lib/hooks/use-emit-x";
import { EvPaths } from "@/socket-io/ev-paths";
import { useServerCookie } from "@/lib/hooks/use-server-cookie";
import { SocketResponse } from "@/lib/types/socket-response";
import { DoctorState } from "../../../../../models/doctor-state";
import { Loader } from "lucide-react";
import { useDoctorStore } from "@/stores/clickdesk/doctor/doctor-store";

const DoctorBoxes = () => {
  const { user } = useServerCookie();
  const { data, isConnected, emitAck } = useEmitX<
    any,
    SocketResponse<DoctorState[]>
  >({
    ev: EvPaths.GetMobileDoctorInfo,
  });

  const doctors = useDoctorStore((state) => state.doctors);

  useEffect(() => {
    if (!isConnected || !user) return;
    emitAck({ key: user.roomKey });
  }, [isConnected, user]);

  const newDoctors = data?.data?.filter((d) => {
    return !doctors.some((doc) => doc.code === d.code);
  });

  if (!newDoctors || newDoctors.length === 0) {
    return <></>;
  }
  return (
    <div className="border-l border-l-slate-200 bg-slate-200">
      <ul className="flex flex-col gap-2 p-4">
        {data?.status == "success" ? (
          newDoctors?.map((doctor) => (
            <DoctorCard key={doctor.code} state={doctor} />
          ))
        ) : (
          <div className="animate-spin">
            <Loader />
          </div>
        )}
      </ul>
    </div>
  );
};

export default DoctorBoxes;
