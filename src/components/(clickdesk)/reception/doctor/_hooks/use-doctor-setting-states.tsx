import { DoctorWorks } from "@/models/doctor-state";
import { TimeValue } from "@/models/time-value";
import { useState } from "react";

export const useDoctorSettingStates = () => {
  const [works, setWorks] = useState<DoctorWorks>();
  const [name, setName] = useState<string>();
  const [kwamokName, setKwamokName] = useState<string>();
  const [jinchalName, setJinchalName] = useState<string>();

  function clearStates() {
    setWorks(undefined);
    setName(undefined);
    setKwamokName(undefined);
    setJinchalName(undefined);
  }

  function handleSetWorks(
    key: keyof DoctorWorks,
    checked: boolean,
    start?: TimeValue | undefined,
    end?: TimeValue | undefined,
  ) {
    setWorks((prev) => {
      const data: DoctorWorks | undefined = checked
        ? {
            [key]: [
              {
                start,
                end,
              },
            ],
          }
        : {
            [key]: undefined,
          };

      return { ...prev, ...data };
    });
  }

  return {
    works,
    name,
    kwamokName,
    jinchalName,
    handleSetWorks,
    setName,
    setKwamokName,
    setJinchalName,
    clearStates,
  };
};
