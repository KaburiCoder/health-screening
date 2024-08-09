import { DoctorWorks, TimeRange } from "@/models/doctor-state";
import { useEffect, useState } from "react";

interface Args {
  works: DoctorWorks | undefined;
}
export const useDoctorSettingStates = ({ works: baseWorks }: Args) => {
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
    timeRanges: TimeRange[] | undefined,
  ) {
    setWorks((prev) => {
      const data: DoctorWorks | undefined = {
        [key]: checked ? timeRanges : undefined,
      };

      return { ...prev, ...data };
    });
  }

  useEffect(() => {
    setWorks(baseWorks);
  }, [baseWorks]);
  
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
