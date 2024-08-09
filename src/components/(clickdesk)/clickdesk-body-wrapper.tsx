import { cn } from "@/lib/utils";
import { ChildrenClassNameProps, ChildrenProps } from "kbr-nextjs-shared/props";

interface Props extends ChildrenClassNameProps {
  title: string;
  edgeComponent?: React.ReactNode;
}
export const ClickBodyWrapper = ({
  title,
  children,
  className,
  edgeComponent,
}: Props) => {
  return (
    <div className={cn("flex flex-col items-stretch px-10 pb-10", className)}>
      <div className="flex items-center justify-between border-b border-b-amber-500 pt-4">
        <h2 className=" py-4 text-xl font-bold text-amber-800">{title}</h2>
        {edgeComponent}
      </div>
      {children}
    </div>
  );
};
