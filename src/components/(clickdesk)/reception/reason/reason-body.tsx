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
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy
} from "@dnd-kit/sortable";
import { ClickBodyWrapper } from "../../clickdesk-body-wrapper";
import { useReasonService } from "./_hooks/use-reason-service";
import { useReasonStates } from "./_hooks/use-reason-states";
import { SayuBox } from "./_sayu-box/sayu-box";
import { SayuBoxes } from "./_sayu-box/sayu-boxes";

export const ReasonBody = () => {
  const { isPending, queryData, updateAllMutate } = useReasonService();
  const { activeId, items, handleDragStart, handleDragCancel, handleDragEnd } =
    useReasonStates(queryData);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function handleDragChanged(changedItems: ReasonState[]): void {
    updateAllMutate({ reasons: changedItems });
  }

  return (
    <ClickBodyWrapper title="내원사유 설정">
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
