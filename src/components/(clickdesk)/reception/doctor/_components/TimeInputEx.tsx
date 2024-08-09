import { TimeValue } from "@/models/time-value";
import { TimeInput } from "@nextui-org/react";
import React from "react";

interface TimeInputExProps {
  isDisabled: boolean;
  value: TimeValue | undefined;
  onChange: (value: TimeValue | undefined) => void;
}
export const TimeInputEx = ({
  isDisabled,
  value,
  onChange,
}: TimeInputExProps) => {
  return (
    <TimeInput
      className="m-auto max-w-16"
      classNames={{ input: "justify-center" }}
      color="primary"
      variant="underlined"
      isDisabled={isDisabled}
      hourCycle={24}      
      value={value as any}
      onChange={(value) => {
        onChange(
          value ? { hour: value.hour, minute: value.minute } : undefined,
        );
      }}
    />
  );
};
