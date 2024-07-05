import { ReasonState } from "@/models/reason-state";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, { useCallback, useEffect, useState } from "react";

export const useReasonStates = (queryData: ReasonState[] | undefined) => {
  const [items, setItems] = useState<ReasonState[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setItems(queryData ?? []);
  }, [queryData]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const handleDragEnd = useCallback(
    (onChanged: (changedItems: ReasonState[]) => void, event: DragEndEvent) => {
      const { active, over } = event;

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

        onChanged(changedItems);     
        setItems(movedItems);
      }

      setActiveId(null);
    },
    [items],
  );

  return {
    items,
    activeId,
    handleDragStart,
    handleDragCancel,
    handleDragEnd,
  };
};
