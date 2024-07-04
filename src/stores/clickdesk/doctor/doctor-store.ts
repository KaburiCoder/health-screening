import { DoctorState } from "@/models/doctor-state";
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  doctors: DoctorState[];
}

interface Actions {
  setDoctors: (doctors: DoctorState[]) => void;
  clear: () => void;
}

const initialState: State = {
  doctors: []
};

const stateCreator: StateCreator<State & Actions> = (set) => ({
  ...initialState,
  setDoctors: (doctors) => set(() => ({ doctors })),
  clear: () => set(initialState),
});

export const useDoctorStore = create(devtools(stateCreator));
