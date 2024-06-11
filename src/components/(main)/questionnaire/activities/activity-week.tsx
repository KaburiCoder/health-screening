import { Description } from "@/components/description";
import { LabeldNumInput } from "@/components/num-input";
import { InputValueType } from "kbr-nextjs-shared/types";
import React, { useRef } from "react";
import { useFocus } from "../../../../lib/hooks/use-focus";

interface Props {
  headmark: string;
  text: string;
  focusNextId?: string;
  id?: string;
  value?: number;
  onChange: (value: number | undefined) => void;
}

export default function ActivityWeek({
  value,
  headmark,
  focusNextId,
  text,
  id,
  onChange,
}: Props) {
  const { conditions } = useFocus();
  const ref = useRef<HTMLInputElement>(null);
  function handleChange(value: number | undefined): void {
    if (conditions.weekday(value)) {
      if (focusNextId) {
        document.getElementById(focusNextId)?.focus();
      } else {
        ref.current?.blur();
      }
    }
    onChange(value);
  }

  return (
    <div className="flex w-fit flex-col">
      <Description headmark={headmark} text={text} />

      <LabeldNumInput
        id={id}
        ref={ref}
        value={value}
        className="ml-auto"
        inputClassName="w-12"
        sLabel="주당"
        eLabel="일"
        min={0}
        max={7}
        onChange={handleChange}
      />
    </div>
  );
}
