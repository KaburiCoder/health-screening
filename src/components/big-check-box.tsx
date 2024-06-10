import { Checkbox, CheckboxProps, cn } from "@nextui-org/react";
import { ChildrenClassNameProps, ChildrenProps } from "kbr-nextjs-shared/props";
import React from "react";

interface Props extends CheckboxProps {
  value?: string;
  checked?: boolean;
  isDisabled?: boolean;
}
export default function BigCheckBox({
  value,
  checked,
  isDisabled,
  children,
  className,
  ...props
}: Props & ChildrenClassNameProps) {
  return (
    <Checkbox
      value={value}
      isDisabled={isDisabled}
      checked={checked}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-purple-100",
          "data-[selected=true]:border-primary",
          className,
        ),
        label: "w-full",
      }}
      {...props}
    >
      {children}
    </Checkbox>
  );
}
