"use client";
import { LoadingOverlay } from "@/components/loading-overlay";
import { ReasonState } from "@/models/reason-state";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { ClickBodyWrapper } from "../../clickdesk-body-wrapper";
import { useReasonService } from "./_hooks/use-reason-service";
import { useReasonStates } from "./_hooks/use-reason-states";
import { SayuBox } from "./_sayu-box/sayu-box";
import { SayuBoxes } from "./_sayu-box/sayu-boxes";
import { ReasonSelect } from "./_reason-select/ReasonSelect";
import { useState } from "react";
import {
  ReasonSelDoctorProivder,
  useReasonSelDoctor,
} from "./_providers/reason-sel-doctor.provider";

export const ReasonBody = () => {
  return (
    <ReasonSelDoctorProivder>
      <ReasonBody2 />
    </ReasonSelDoctorProivder>
  );
};

const ReasonBody2 = () => {
  const { doctorId, setDoctorId } = useReasonSelDoctor();
  const { isPending, queryData, updateAllMutate } = useReasonService({
    doctorId,
  });
  const { activeId, items, handleDragStart, handleDragCancel, handleDragEnd } =
    useReasonStates(queryData);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function handleDragChanged(changedItems: ReasonState[]): void {
    updateAllMutate({ reasons: changedItems });
  }

  return (
    <ClickBodyWrapper
      title="내원사유 설정"
      edgeComponent={<ReasonSelect value={doctorId} onChange={setDoctorId} />}
    >
      <LoadingOverlay className={isPending ? "" : "hidden"} />
      <div className="mt-4" />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd.bind(null, handleDragChanged)}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <SayuBoxes items={items} />
        </SortableContext>
        <DragOverlay style={{ transformOrigin: "0 0" }}>
          {activeId ? (
            <SayuBox
              className="h-full"
              item={items.find((item) => item.id === activeId)!}
              isDragging
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </ClickBodyWrapper>
  );
};
