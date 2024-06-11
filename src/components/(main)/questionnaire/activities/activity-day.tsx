import { Description } from "@/components/description";
import { LabeldNumInput } from "@/components/num-input";
import { IActivityTerm } from "health-screening-shared/interfaces";
import React, { useRef } from "react";
import { useFocus } from "../../../../lib/hooks/use-focus";

interface Props {
  headmark: string;
  text: string;
  focusNextId: string;
  id?: string;
  hourId?: string;
  minuteId?: string;
  value?: IActivityTerm;
  onHoursChange: (value: number | undefined) => void;
  onMinutesChange: (value: number | undefined) => void;
}

export default function ActivityDay({
  headmark,
  id,
  text,
  value,
  hourId,
  minuteId,
  focusNextId,
  onHoursChange,
  onMinutesChange,
}: Props) {
  const hourRef = useRef<HTMLInputElement>(null);
  const minRef = useRef<HTMLInputElement>(null);
  const { conditions } = useFocus();

  function handleHourChange(value: number | undefined): void {
    if (conditions.hour(value)) minRef.current?.focus();
    onHoursChange(value);
  }

  function handleMinChange(value: number | undefined): void {
    if (conditions.minute(value)) {
      document.getElementById(focusNextId)?.focus();
    }
    onMinutesChange(value);
  }

  return (
    <div id={id} className="flex w-fit flex-col">
      <Description headmark={headmark} text={text} />

      <div className="ml-auto flex">
        <LabeldNumInput
          id={hourId}
          ref={hourRef}
          inputClassName="w-12"
          sLabel="하루에"
          eLabel="시간"
          value={value?.hours}
          min={0}
          max={23}
          onChange={handleHourChange}
        />
        <LabeldNumInput
          id={minuteId}
          ref={minRef}
          className="ml-2"
          inputClassName="w-12"
          eLabel="분"
          value={value?.minutes}
          min={0}
          max={59}
          onChange={handleMinChange}
        />
      </div>
    </div>
  );
}
