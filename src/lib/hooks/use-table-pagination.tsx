import TablePagination from "@/components/table-pagination";
import { PaginationState } from "@tanstack/react-table";
import React from "react";

interface Props {
  defaultPageSize?: 10 | 20 | 30 | 40 | 50;
}

export const useTablePagination = (props?: Props) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: props?.defaultPageSize ?? 20,
  });

  return {
    pagination,
    setPagination,
    TablePagination,
  };
};
