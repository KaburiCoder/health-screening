import { TimeRange } from "@/models/doctor-state";
import { TimeValue } from "@/models/time-value";
import { TimeInputEx } from "./TimeInputEx";

interface Props {
  isDisabled: boolean;
  value: TimeRange | undefined;
  onChange: (value: TimeRange | undefined) => void;
}
export const TimeRangeInput = ({ isDisabled, value, onChange }: Props) => {
  function handleChange(
    key: keyof TimeRange,
    timeValue: TimeValue | undefined,
  ): void {
    const anotherValue = key === "start" ? value?.end : value?.start;

    if (!timeValue && !anotherValue) {
      return onChange(undefined);
    }
    onChange({ ...value, [key]: timeValue });
  }

  return (
    <>
      <TimeInputEx
        isDisabled={isDisabled}
        value={value?.start}
        onChange={handleChange.bind(null, "start")}
      />
      <span className="text-gray-500">~</span>
      <TimeInputEx
        isDisabled={isDisabled}
        value={value?.end}
        onChange={handleChange.bind(null, "end")}
      />
    </>
  );
};
