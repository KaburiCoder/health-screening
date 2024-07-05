import { cn } from "@/lib/utils";
import { ReasonState } from "@/models/reason-state";
import { ChildrenProps, ClassNameProps } from "kbr-nextjs-shared/props";
import { LoaderCircle, Trash2, Wrench } from "lucide-react";

export interface BottomButtonsProps extends ClassNameProps {
  isPending: boolean;
  onAddClick: () => void;
  onDeleteClick: () => void;
}

export const SayuBottomButtons = ({
  isPending,
  className,
  onAddClick,
  onDeleteClick,
}: BottomButtonsProps) => {
  return (
    <div className={cn("flex gap-[1px] transition-all", className)}>
      <Wrapper isPending={isPending} onClick={onAddClick}>
        <Wrench />
      </Wrapper>
      <Wrapper isPending={isPending} onClick={onDeleteClick}>
        <Trash2 />
      </Wrapper>
    </div>
  );
};

const Wrapper = ({
  isPending,
  children,
  onClick,
}: ChildrenProps & { isPending: boolean; onClick: () => void }) => {
  return (
    <button
      className={cn(
        "flex-center flex-1 bg-amber-500 py-1 text-white",
        "hover:cursor-pointer hover:bg-amber-600",
        "disabled:bg-slate-300 hover:disabled:bg-slate-300",
      )}
      onClick={onClick}
      disabled={isPending}
    >
      {isPending ? <LoaderCircle className="animate-spin" /> : children}
    </button>
  );
};
