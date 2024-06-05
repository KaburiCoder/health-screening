import { Input } from "@nextui-org/react";
import { Column } from "@tanstack/react-table";
import React from "react";

export default function Filter({ column }: { column: Column<any, any> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <Input
      className="min-w-20 max-w-full p-1 text-base"
      onChange={(e) => column.setFilterValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      placeholder={`Search...`}
      color="primary"
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}
