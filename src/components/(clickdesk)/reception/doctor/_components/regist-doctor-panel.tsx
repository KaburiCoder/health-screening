import { LoadingOverlay } from "@/components/loading-overlay";
import { cn } from "@/lib/utils";
import { useDisclosure } from "@nextui-org/react";
import { ChildrenProps } from "kbr-nextjs-shared/props";
import { useEffect, useState } from "react";
import { DoctorState } from "../../../../../models/doctor-state";
import { DoctorDragging } from "../libs/doctor_dragging";
import { useDoctorService } from "../_hooks/use-doctor-service";
import styles from "./doctor-grid.module.css";
import { RegistDoctorRow } from "./regist-doctor-row";
import { DoctorSettingDialog } from "./doctor-setting-dialog";
import { useDoctorStore } from "@/stores/clickdesk/doctor/doctor-store";
import { SortableList } from "@/components/dnd-kit/sortable-list";

export const RegistDoctorPanel = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedId, setSelectedId] = useState("");
  const {
    queryData,
    saveData,
    deleteData,
    saveMutate,
    deleteMutate,
    updateSeqMutate,
    isPending,
  } = useDoctorService();

  const doctors = useDoctorStore((state) => state.doctors);
  const setDoctors = useDoctorStore((state) => state.setDoctors);

  function handleDragEnd({
    items,
    startIndex,
    endIndex,
  }: {
    items: DoctorState[];
    startIndex: number;
    endIndex: number;
  }): void {
    const changedItems = items.filter(
      (_, index) => index >= startIndex && index <= endIndex,
    );
    const codes = changedItems.map((item) => {
      return { code: item.code, seq: startIndex++ };
    });

    updateSeqMutate({ codes });
    setDoctors(items);
  }

  function handleDropped(state: DoctorState) {
    if (doctors.some((item) => item.code === state.code)) return;

    const { id, ...otherState } = state;
    const nextSeq =
      doctors.length > 0 ? Math.max(...doctors.map((item) => item.seq)) + 1 : 1;
    saveMutate({ ...otherState, seq: nextSeq });
  }

  useEffect(() => {
    setDoctors(queryData ?? []);
  }, [queryData]);

  useEffect(() => {
    if (!saveData) return;
    setDoctors(doctors.concat(saveData));
  }, [saveData]);

  useEffect(() => {
    if (!deleteData) return;

    setDoctors(doctors.filter((p) => p.id !== deleteData.id));
  }, [deleteData]);

  function handleSettingsClick(id: string): void {
    setSelectedId(id);
    onOpen();
  }

  return (
    <div
      className="relative flex flex-1 flex-col bg-slate-100"
      onDrop={DoctorDragging.handleDrop.bind(null, handleDropped)}
      onDragOver={DoctorDragging.handleDragOver}
    >
      {isPending && <LoadingOverlay />}
      <DoctorSettingDialog
        id={selectedId}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <GridHeader />
      <SortableList
        items={doctors}
        className="flex flex-col"
        onChange={handleDragEnd}
        renderItem={(item, index) => (
          <SortableList.Item id={item.id}>
            <RegistDoctorRow
              onSettingsClick={handleSettingsClick}
              onDeleteClick={(code) => deleteMutate({ code })}
              index={index}
              state={item}
            />
          </SortableList.Item>
        )}
      />
    </div>
  );
};

const GridHeader = () => {
  return (
    <div className={cn("grid bg-amber-500 text-white", styles.grid)}>
      <GridHeaderItem>순번</GridHeaderItem>
      <GridHeaderItem>진료실</GridHeaderItem>
      <GridHeaderItem>의사명칭</GridHeaderItem>
      <GridHeaderItem>과목</GridHeaderItem>
      <GridHeaderItem>근무요일</GridHeaderItem>
      <GridHeaderItem></GridHeaderItem>
      <GridHeaderItem></GridHeaderItem>
    </div>
  );
};

const GridHeaderItem = ({ children }: ChildrenProps) => {
  return (
    <div className="border-l border-slate-200 text-center">{children}</div>
  );
};
