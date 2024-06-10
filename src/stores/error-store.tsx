import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { LifestyleKeys, QnKeys } from "./condition-store";

type ObjectType = { [key: string]: string };
type SelectedKey = QnKeys | LifestyleKeys | "cancer";
interface State {
  selectedKey?: SelectedKey;
  error?: ObjectType;
}

interface Actions {
  setError: (selectedKey: SelectedKey, error?: ObjectType) => void;
  clearError: () => void;
}

const initialState: State = {
  selectedKey: undefined,
  error: undefined,
};

const stateCreator: StateCreator<State & Actions> = (set) => ({
  ...initialState,
  setError: (selectedKey, error) => set(() => ({ selectedKey, error })),
  clearError: () => set(initialState),
});

export const useErrorStore = create(devtools(stateCreator));
