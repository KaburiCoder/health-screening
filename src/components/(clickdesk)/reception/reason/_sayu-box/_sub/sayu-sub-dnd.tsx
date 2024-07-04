import { InputEx } from "@/components/index-ex";
import { ReasonSub } from "@/models/reason-state";
import { Button } from "@nextui-org/react";
import { GripVertical, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface Props {
  subs: ReasonSub[];
  setSubs: React.Dispatch<React.SetStateAction<ReasonSub[]>>;
}
export const SayuSubDnd = ({ subs, setSubs }: Props) => {
  function handleInputChange(inputSub: ReasonSub, value: string): void {
    setSubs((sub) => {
      const foundSub = sub.find((_s) => _s === inputSub);
      if (foundSub) foundSub.text = value;
      return sub;
    });
  }

  function handleInputDelete(inputSub: ReasonSub): void {
    setSubs((sub) => sub.filter((_s) => _s !== inputSub));
  }

  return (
    <div className="flex flex-col gap-2">
      {subs.map((s, i) => (
        <InputRow
          defaultValue={s.text}
          onChange={handleInputChange.bind(null, s)}
          key={i}
          onDelete={handleInputDelete.bind(null, s)}
        />
      ))}
    </div>
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
      <GripVertical className="text-gray-500" />
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
