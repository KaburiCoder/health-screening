import { Input, InputProps } from "@nextui-org/react";
import ErrorBox from "../error-box";
import React from "react";

interface InputXProps extends InputProps {
  errorMessage?: string;
}
export const InputX = React.forwardRef<HTMLInputElement, InputXProps>(
  ({ errorMessage, ...props }: InputXProps, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <Input ref={ref} {...props} />
        <ErrorBox errorMessage={errorMessage} noBorder />
      </div>
    );
  },
);

InputX.displayName = "InputX";