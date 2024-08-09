import { TimeRange } from "@/models/doctor-state";
import { Checkbox } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { TimeRangeInput } from "./TimeRangeInput";

interface WorkingTimeProps {
  checkText: string;
  timeRanges?: TimeRange[];
  errorMessage?: string;
  onChange: (checked: boolean, timeRanges?: TimeRange[]) => void;
}

export const WorkingTimes = ({
  checkText,
  timeRanges,
  errorMessage,
  onChange,
}: WorkingTimeProps) => {
  const [range0, setRange0] = useState<TimeRange>();
  const [range1, setRange1] = useState<TimeRange>();
  const [checked, setChecked] = useState<boolean>(!!range0);

  function handleCheckChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setChecked(e.target.checked);
  }

  useEffect(() => {
    const ranges: TimeRange[] = [];
    if (range0) ranges.push(range0);
    if (range1) ranges.push(range1);

    onChange(checked, ranges);
  }, [checked, range0, range1]);

  useEffect(() => {
    if (checkText === "수") {
      console.log(timeRanges);
    }
    setChecked((timeRanges?.length ?? 0) > 0);
    setRange0(timeRanges?.[0]);
    setRange1(timeRanges?.[1]);
  }, [timeRanges]);

  function handleChange0(value: TimeRange | undefined): void {
    setRange0(value);
  }

  function handleChange1(value: TimeRange | undefined): void {
    setRange1(value);
  }

  return (
    <>
      <Checkbox
        className="max-w-full justify-center"
        isSelected={checked}
        onChange={handleCheckChange}
      >
        {checkText}
      </Checkbox>
      <div className="col-span-4">
        <div className="flex items-center gap-1">
          <TimeRangeInput
            isDisabled={!checked}
            value={range0}
            onChange={handleChange0}
          />
          <span className="text-gray-500">/</span>
          <TimeRangeInput
            isDisabled={!checked}
            value={range1}
            onChange={handleChange1}
          />
        </div>
        {errorMessage && (
          <div className="col-span-3 text-center text-red-500">
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
};
