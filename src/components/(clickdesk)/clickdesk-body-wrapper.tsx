import { cn } from "@/lib/utils";
import { ChildrenClassNameProps, ChildrenProps } from "kbr-nextjs-shared/props";

interface Props extends ChildrenClassNameProps {
  title: string;
}
export const ClickBodyWrapper = ({ title, children, className }: Props) => {
  return (
    <div className={cn("flex flex-col items-stretch px-10", className)}>
      <div className="pt-4">
        <h2 className="border-b border-b-amber-500 py-4 text-xl font-bold text-amber-800">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
};
