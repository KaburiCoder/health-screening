import { InputEx } from "@/components/index-ex";
import { ReasonState } from "@/models/reason-state";
import { Button } from "@nextui-org/react";
import { GripVertical, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { SortableList } from "../../../../../dnd-kit/sortable-list";

interface Props {
  subs: ReasonState[];
  setSubs: React.Dispatch<React.SetStateAction<ReasonState[]>>;
}
export const SayuSubDnd = ({ subs, setSubs }: Props) => {
  function handleInputChange(inputSub: ReasonState, value: string): void {
    setSubs((sub) => {
      const foundSub = sub.find((_s) => _s === inputSub);
      if (foundSub) foundSub.text = value;
      return sub;
    });
  }

  function handleInputDelete(inputSub: ReasonState): void {
    setSubs((sub) => sub.filter((_s) => _s !== inputSub));
  }

  return (
    <SortableList
      items={subs}
      className="flex flex-col gap-2"
      onChange={setSubs}
      renderItem={(item) => (
        <SortableList.Item id={item.id}>
          <InputRow
            defaultValue={item.text}
            onChange={handleInputChange.bind(null, item)}
            key={item.id}
            onDelete={handleInputDelete.bind(null, item)}
          />
        </SortableList.Item>
      )}
    />
  );
};

interface InputRowProps {
  defaultValue: string;
  onChange: (value: string) => void;
  onDelete: () => void;
}

const InputRow = ({ defaultValue, onChange, onDelete }: InputRowProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <SortableList.DragHandleWrapper>
        <GripVertical className="text-gray-500" />
      </SortableList.DragHandleWrapper>
      <div className="flex-1">
        <InputEx
          defaultValue={defaultValue}
          errorMessage=""
          onChange={onChange}
        />
      </div>
      <Button
        variant="light"
        isIconOnly
        startContent={<Trash2 className="text-gray-500" />}
        onClick={onDelete}
      />
    </div>
  );
};
