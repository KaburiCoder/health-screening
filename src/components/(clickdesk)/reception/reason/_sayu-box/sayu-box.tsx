import React, { CSSProperties, useEffect, useState } from "react";
import { SayuHeader } from "./sayu-header";
import { SayuBottomButtons } from "./sayu-bottom-buttons";
import { SayuSubList } from "./_sub/sayu-sub-list";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { DraggableAttributes } from "@dnd-kit/core";
import { cn, useDisclosure } from "@nextui-org/react";
import { ReasonState } from "@/models/reason-state";
import { SayuSubAddDialog } from "./_sub/sayu-sub-add-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReason } from "@/services/clickdesk/reason/delete-reason";
import { apiPaths } from "@/paths";
import { useSayuBoxService } from "./_hooks/use-sayu-box-service";

export interface SayuBoxProps {
  item: ReasonState;
  index?: number;
  withOpacity?: boolean;
  isDragging?: boolean;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
  style?: CSSProperties;
  className?: string;
}

export const SayuBox = React.forwardRef<HTMLDivElement, SayuBoxProps>(
  (
    {
      className,
      listeners,
      attributes,
      withOpacity,
      isDragging,
      style,
      item,
      ...props
    }: SayuBoxProps,
    ref,
  ) => {
    const disclosure = useDisclosure();
    const [isHover, setIsHover] = useState(false);
    const { isPending, handleDelete } = useSayuBoxService(item);

    useEffect(() => {
      if (!disclosure.isOpen) setIsHover(false);
    }, [disclosure.isOpen]);

    const inlineStyles: CSSProperties = {
      transformOrigin: "50% 50%",
      boxShadow: isDragging
        ? "rgb(255 150 68 / 50%) 0px 0px 0px 2px, rgb(255 150 81 / 70%) 0px 1px 3px 0px"
        : "rgb(255 150 68 / 30%) 0px 0px 0px 1px, rgb(255 150 81 / 50%) 0px 1px 3px 0px",
      ...style,
    };

    return (
      <>
        <SayuSubAddDialog {...disclosure} item={item} />
        <div
          className={cn(
            "flex min-h-40 flex-col overflow-hidden rounded bg-white shadow",
            withOpacity ? "opacity-50" : "",
            isDragging ? "cursor-grabbing" : "cursor-default",
            className,
          )}
          ref={ref}
          {...props}
          style={inlineStyles}
        >
          <div
            className="flex h-full flex-col justify-between overflow-hidden rounded bg-white shadow"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <SayuHeader
              attributes={attributes}
              listeners={listeners}
              item={item}
            />
            <SayuSubList sub={item.sub} />
            <SayuBottomButtons
              onAddClick={() => disclosure.onOpen()}
              onDeleteClick={handleDelete}
              className={!isDragging && isHover ? "" : "opacity-0"}
              isPending={isPending}
            />
          </div>
        </div>
      </>
    );
  },
);
