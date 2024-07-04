import { ChildrenProps } from "kbr-nextjs-shared/props";

export const GridTitle = ({ children }: ChildrenProps) => {
  return (
    <div className="flex items-center justify-center rounded bg-slate-200 p-2">
      {children}
    </div>
  );
};
