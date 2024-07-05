import { ChildrenClassNameProps, ChildrenProps } from "kbr-nextjs-shared/props";
import styles from "./doctor-grid.module.css";
import { cn } from "@/lib/utils";
import { Grid, Settings, Trash2 } from "lucide-react";
import { DoctorState, DoctorWorks } from "@/models/doctor-state";
import { SortableList } from "@/components/dnd-kit/sortable-list";
import { dayMappings } from "@/contants/doctor-constants";

export interface DoctorSettingCardProps extends ChildrenProps {
  index: number;
  state: DoctorState;
  onDeleteClick: (code: string) => void;
  onSettingsClick: (id: string) => void;
}
export const RegistDoctorRow = ({
  index,
  state,
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
    <div className={cn("grid bg-white", styles.grid)}>
      <DraggableGridItem>{index + 1}</DraggableGridItem>
      <DraggableGridItem>{`${state.code} ${state.jinchalName}`}</DraggableGridItem>
      <DraggableGridItem>{state.name}</DraggableGridItem>
      <DraggableGridItem>{state.kwamokName}</DraggableGridItem>
      <GridItem className="overflow-x-auto">
        <DoctorWorksItems works={state.works} />
      </GridItem>
      {/* <DraggableGridItem></DraggableGridItem> */}
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

const gridStyles = "border-b border-l border-slate-200 px-2 py-4 text-center";
interface GridItemProps extends ChildrenClassNameProps {
  noClassName?: boolean;
  onClick?: () => void;
}
const GridItem = ({
  noClassName,
  className,
  children,
  onClick,
}: GridItemProps) => {
  return (
    <div
      className={cn(noClassName ? "" : gridStyles, className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const DraggableGridItem = ({ children }: ChildrenProps) => {
  return (
    <SortableList.DragHandleWrapper
      className={cn("overflow-x-auto", gridStyles)}
    >
      <GridItem noClassName>{children}</GridItem>
    </SortableList.DragHandleWrapper>
  );
};

const DoctorWorksItems = ({ works }: { works: DoctorWorks | undefined }) => {
  const yoils = dayMappings
    .map(([kor, key]) => (!!works?.[key]?.length ? kor : ""))
    .filter((value) => !!value);

  const yoilComponents = yoils.map((yoil) => (
    <span
      key={yoil}
      className={cn(
        "flex-center h-6 w-6 rounded-full border border-gray-300 px-2",
        yoil === "토" ? "text-blue-500 border-blue-300" : "",
        yoil === "일" ? "text-red-500 border-red-300" : "",
      )}
    >
      {yoil}
    </span>
  ));

  return <div className="flex items-center gap-1">{yoilComponents}</div>;
};
