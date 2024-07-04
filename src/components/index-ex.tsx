import { useEffect, useState } from "react";
import { InputX } from "./ui/input-x";
import { InputProps } from "@nextui-org/react";

interface InputExProps extends Omit<InputProps, "onChange"> {
  defaultValue: string | undefined;
  onChange: (value: string) => void;
  errorMessage?: string;
}

export const InputEx = ({
  defaultValue,
  errorMessage,
  className,
  onChange,
  color = "primary",
  value: _,
  ...props
}: InputExProps) => {
  const [value, setValue] = useState<string>();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value);
    onChange(e.target.value);
  }

  return (
    <InputX
      classNames={{ input: "text-base" }}
      variant="bordered"
      color="primary"
      value={value ?? ""}
      onChange={handleChange}
      errorMessage={errorMessage}
      {...props}
    />
  );
};
