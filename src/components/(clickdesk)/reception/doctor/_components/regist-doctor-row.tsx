import { ChildrenClassNameProps, ChildrenProps } from "kbr-nextjs-shared/props";
import styles from "./doctor-grid.module.css";
import { cn } from "@/lib/utils";
import { Grid, Settings, Trash2 } from "lucide-react";
import { DoctorState, DoctorWorks, TimeRange } from "@/models/doctor-state";
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
      <DraggableGridItem className="justify-start">{`${state.code} ${state.jinchalName}`}</DraggableGridItem>
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
  noGridStyle?: boolean;
  onClick?: () => void;
}
const GridItem = ({
  noGridStyle: noClassName,
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

const DraggableGridItem = ({ children, className }: ChildrenClassNameProps) => {
  return (
    <SortableList.DragHandleWrapper
      className={cn("overflow-x-auto flex items-center justify-center", gridStyles, className)}
    >
      <GridItem noGridStyle>
        {children}
      </GridItem>
    </SortableList.DragHandleWrapper>
  );
};

const DoctorWorksItems = ({ works }: { works: DoctorWorks | undefined }) => {
  const yoilMapData = dayMappings.reduce(
    (acc: { kor: string; timeRanges: TimeRange[] }[], [kor, key]) => {
      const timeRanges = works?.[key];
      if (!timeRanges || timeRanges.length === 0) return acc;

      return acc.concat({ kor, timeRanges });
    },
    [],
  );

  const components = yoilMapData.map((data) => (
    <div key={data.kor} className="flex flex-col items-center">
      <Yoil yoil={data.kor} />
      {data.timeRanges.map((range) => {
        const value = `${formatNumber(range.start!.hour)}:${formatNumber(range.start!.minute)}~${formatNumber(range.end!.hour)}:${formatNumber(range.end!.minute)}`;
        return (
          <div key={value} className="text-xs text-slate-500">
            {value}
          </div>
        );
      })}
    </div>
  ));

  return <div className="flex items-start gap-3">{components}</div>;
};

function formatNumber(num: number): string {
  return num.toString().padStart(2, "0");
}

interface YoilProps {
  yoil: string;
}
const Yoil = ({ yoil }: YoilProps) => {
  return (
    <span
      key={yoil}
      className={cn(
        "flex-center h-6 w-6 rounded-full border border-gray-300 px-2",
        yoil === "토" ? "border-blue-300 text-blue-500" : "",
        yoil === "일" ? "border-red-300 text-red-500" : "",
      )}
    >
      {yoil}
    </span>
  );
};
