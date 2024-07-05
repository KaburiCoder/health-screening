import { DoctorWorks } from "@/models/doctor-state";

export const dayMappings: [string, keyof DoctorWorks][] = [
  ["월", "mon"],
  ["화", "tue"],
  ["수", "wed"],
  ["목", "thu"],
  ["금", "fri"],
  ["토", "sat"],
  ["일", "sun"],
];