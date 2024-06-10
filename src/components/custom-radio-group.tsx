import { RadioGroup, RadioGroupProps } from "@nextui-org/react";
import { CustomRadio } from "./custom-radio";

interface CustomRadioGroupProps extends RadioGroupProps {
  items: { [key: string]: string } | string[][];
  row?: boolean;
  minWidth?: boolean;
  radioClassName?: string;
}

export const CustomRadioGroup = ({
  items,
  row,
  minWidth,
  classNames,
  radioClassName,
  value,
  ...props
}: CustomRadioGroupProps) => {
  if (Array.isArray(items)) {
  }
  const itemComponents = (
    Array.isArray(items) ? items : Object.entries(items)
  ).map(([key, value]) => (
    <CustomRadio
      key={key}
      value={key}
      className={radioClassName}
      classNames={{ base: minWidth ? "min-w-40" : minWidth }}
    >
      {value}
    </CustomRadio>
  ));

  return (
    <RadioGroup
      value={value ?? null}
      {...props}
      classNames={{
        ...classNames,
        wrapper: row ? "flex-row items-center" : "",
      }}
    >
      {itemComponents}
    </RadioGroup>
  );
};
