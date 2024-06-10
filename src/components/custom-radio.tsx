import { Radio, RadioProps, cn } from "@nextui-org/react";

export const CustomRadio = (props: RadioProps) => {
  const { children, classNames, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        ...classNames,
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify",
          "max-w-full cursor-pointer rounded-lg gap-4 p-4 py-2 border-2 border-slate-200",
          "data-[selected=true]:border-primary",
          classNames?.base,
        ),
      }}
    >
      {children}
    </Radio>
  );
};
