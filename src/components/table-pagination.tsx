import { Pagination, Select, SelectItem, cn } from "@nextui-org/react";
import { Table } from "@tanstack/react-table";
import { ClassNameProps } from "kbr-nextjs-shared/props";

interface TablePaginationProps extends ClassNameProps {
  table: Table<any>;
}

export default function TablePagination({
  table,
  className,
}: TablePaginationProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Pagination
        showControls
        initialPage={1}
        page={table.getState().pagination.pageIndex + 1}
        total={table.getPageCount()}
        onChange={(p) => table.setPageIndex(p - 1)}
      />
      <Select
        label="Count"
        className="max-w-28"
        defaultSelectedKeys={[table.getState().pagination.pageSize.toString()]}
        disallowEmptySelection
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {["10", "20", "30", "40", "50"].map((pageSize) => (
          <SelectItem key={pageSize}>{pageSize}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
