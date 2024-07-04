"use client";
import React, {
  CSSProperties,
  FC,
  HTMLAttributes,
  forwardRef,
  useCallback,
  useState,
} from "react";
import { ClickBodyWrapper } from "../../clickdesk-body-wrapper";

import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
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
import { CSS } from "@dnd-kit/utilities"; 
import { Button } from "@nextui-org/react";
import { Plus, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SayuAdd } from "./_components/sayu-add";
import { SayuDragCard } from "./_components/sayu-drag-card";

export interface ReasonState extends ReasonSub {
  id: string;
}

export interface ReasonSub {
  text: string;
  seq: number;
  sub?: ReasonSub[];
}

export const ReasonBody = () => {
  const [items, setItems] = useState<ReasonState[]>([
    { id: "a", seq: 1, text: "하이" },
    {
      id: "b",
      seq: 2,
      text: "문진표",
      sub: [
        {
          text: "일반",
          seq: 1,
        },
        {
          text: "암검진",
          seq: 1,
        },
      ],
    },
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id); //  items.indexOf(active.id as string);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }, []);
  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <ClickBodyWrapper title="내원사유 설정">
      <div className="mt-4" />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-5 gap-2">
            {items.map((item, index) => (
              <SortableItem key={item.id} item={item} index={index} />
            ))}
            <SayuAdd onClick={()=> {
              
            }}/>
          </div>
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
          {activeId ? (
            <SayuDragCard
              item={items.find((item) => item.id === activeId)!}
              isDragging
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </ClickBodyWrapper>
  );
};

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  withOpacity?: boolean;
  isDragging?: boolean;
  item: ReasonState;
  index: number;
};

const SortableItem: FC<ItemProps> = (props) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <SayuDragCard
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      listeners={listeners}
      attributes={attributes}
      {...props}
      {...attributes}
    />
  );
};
