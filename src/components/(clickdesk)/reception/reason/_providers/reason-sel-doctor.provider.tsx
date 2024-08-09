import { ChildrenProps } from "kbr-nextjs-shared/props";
import { createContext, useContext, useState } from "react";

interface ReasonSelDoctorState {
  doctorId: string;
}

interface ReasonSelDoctorAction {
  setDoctorId: (doctorId: string) => void;
}

const initialState: ReasonSelDoctorState = {
  doctorId: "",
};

const ReasonSelDoctorContext = createContext<
  ReasonSelDoctorState & ReasonSelDoctorAction
>({ ...initialState, setDoctorId: () => {} });

export const useReasonSelDoctor = () => {
  return useContext(ReasonSelDoctorContext);
};

export const ReasonSelDoctorProivder = ({ children }: ChildrenProps) => {
  const [doctorId, setDoctorId] = useState(initialState.doctorId);
  return (
    <ReasonSelDoctorContext.Provider
      value={{ doctorId, setDoctorId: (doctorId) => setDoctorId(doctorId) }}
    >
      {children}
    </ReasonSelDoctorContext.Provider>
  );
};
