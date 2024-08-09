"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiPaths } from "@/paths";
import { getAllDoctors } from "@/services/clickdesk/doctor/get-all-doctors";
import { useQuery } from "@tanstack/react-query";

type DoctorSelectType = {
  value: string;
  label: string;
};

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function ReasonSelect({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const { data } = useQuery({
    queryFn: getAllDoctors,
    queryKey: [apiPaths.clickdesk.doctor],
  });

  const doctorItems = (data ?? []).reduce(
    (acc, cur) => {
      return acc.concat({ label: cur.name, value: cur.id });
    },
    [{ label: "🏵️ 전체", value: "" }] satisfies DoctorSelectType[],
  )!;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {doctorItems.find((doctorItem) => doctorItem.value === value)?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {doctorItems.map((doctorItem) => (
                <CommandItem
                  key={doctorItem.value}
                  value={doctorItem.value}
                  onSelect={(currentValue: any) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === doctorItem.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {doctorItem.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
