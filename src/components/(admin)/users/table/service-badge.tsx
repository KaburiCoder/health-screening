import { ChildrenProps } from "kbr-nextjs-shared/props";

export const ServiceBadge = ({ children }: ChildrenProps) => {
  return (
    <div className="w-fit whitespace-nowrap rounded border border-purple-300 bg-purple-50 px-1 text-purple-500">
      {children}
    </div>
  );
};
