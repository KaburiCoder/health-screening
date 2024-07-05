"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ClickBodyWrapper } from "../../clickdesk-body-wrapper";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { SayuBox } from "./_sayu-box/sayu-box";
import { SayuBoxes } from "./_sayu-box/sayu-boxes";
import { ReasonState } from "@/models/reason-state";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllReasons } from "@/services/clickdesk/reason/get-all-reasons";
import { apiPaths } from "@/paths";
import { LoadingOverlay } from "@/components/loading-overlay";
import { updateAllReasons } from "@/services/clickdesk/reason/update-all-reasons";

export const ReasonBody = () => {
  const { data: queryData, isPending: isQueryPending } = useQuery({
    queryFn: getAllReasons,
    queryKey: [apiPaths.clickdesk.reason],
  });

  const {
    error: updateAllErorr,
    data: updateAllData,
    mutate: updateAllMutate,
  } = useMutation({
    mutationFn: updateAllReasons,
  });

  const [items, setItems] = useState<ReasonState[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      console.log("---", items, "---");

      const oldIndex = items.findIndex((item) => item.id === active.id); //  items.indexOf(active.id as string);
      const newIndex = items.findIndex((item) => item.id === over?.id);

      if (active.id !== over?.id) {
        let minIndex = Math.min(oldIndex, newIndex);
        const maxIndex = Math.max(oldIndex, newIndex);
        const movedItems = arrayMove(items, oldIndex, newIndex);
        const changedItems = movedItems.filter(
          (_, index) => index >= minIndex && index <= maxIndex,
        );
        changedItems.forEach((item) => (item.seq = ++minIndex));

        updateAllMutate({ reasons: changedItems });

        setItems(movedItems);
      }

      setActiveId(null);
    },
    [items],
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  useEffect(() => {
    setItems(queryData ?? []);
  }, [queryData]);

  return (
    <ClickBodyWrapper title="내원사유 설정">
      <LoadingOverlay className={isQueryPending ? "" : "hidden"} />
      <div className="mt-4" />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <SayuBoxes items={items} />
        </SortableContext>
        <DragOverlay adjustScale={false} style={{ transformOrigin: "0 0" }}>
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
