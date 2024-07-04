import { DraggableProvided } from "@hello-pangea/dnd";
import { ChildrenClassNameProps, ChildrenProps } from "kbr-nextjs-shared/props";
import styles from "./doctor-grid.module.css";
import { cn } from "@/lib/utils";
import { Settings, Trash2 } from "lucide-react";
import { DoctorState } from "@/models/doctor-state";

export interface DoctorSettingCardProps extends ChildrenProps {
  index: number;
  provided: DraggableProvided;
  state: DoctorState;
  onDeleteClick: (code: string) => void;
  onSettingsClick: (id: string) => void;
}
export const DoctorSettingCard = ({
  index,
  state,
  provided,
  children,
  onSettingsClick,
  onDeleteClick,
}: DoctorSettingCardProps) => {
  function handleDeleteClick(): void {
    const result = confirm(
      "정말로 삭제하시겠습니까?\n설정 내용은 모두 삭제됩니다.",
    );

    if (result) onDeleteClick(state.code);
  }

  function handleSettingsClick(): void {
    onSettingsClick(state.id);
  }

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={cn("grid bg-white", styles.grid)}
    >
      <GridItem>{index + 1}</GridItem>
      <GridItem>{`${state.code} ${state.jinchalName}`}</GridItem>
      <GridItem>{state.name}</GridItem>
      <GridItem>{state.kwamokName}</GridItem>
      <GridItem
        className={cn(
          "flex items-center justify-center text-blue-400",
          "hover:cursor-pointer hover:bg-blue-100",
        )}
        onClick={handleSettingsClick}
      >
        <Settings />
      </GridItem>
      <GridItem
        className={cn(
          "flex items-center justify-center text-red-400",
          "hover:cursor-pointer hover:bg-red-100",
        )}
        onClick={handleDeleteClick}
      >
        <Trash2 />
      </GridItem>
    </div>
  );
};

interface GridItemProps extends ChildrenClassNameProps {
  onClick?: () => void;
}
const GridItem = ({ className, children, onClick }: GridItemProps) => {
  return (
    <div
      className={cn(
        "border-b border-l border-slate-200 px-2 py-4 text-center",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
