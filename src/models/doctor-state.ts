import { TimeValue } from "./time-value";

export class DoctorState {
  id: string = "";
  seq: number = 0;
  code: string = "";
  name: string = "";
  jinchalName: string = "";
  kwamokName: string = "";
  works?: DoctorWorks;
}

export interface DoctorWorks {
  mon?: TimeRange[];
  tue?: TimeRange[];
  wed?: TimeRange[];
  thu?: TimeRange[];
  fri?: TimeRange[];
  sat?: TimeRange[];
  sun?: TimeRange[];
}
interface TimeRange {
  start: TimeValue,
  end: TimeValue;
}

