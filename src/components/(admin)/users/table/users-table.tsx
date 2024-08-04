"use client";
import { useTablePagination } from "@/lib/hooks/use-table-pagination";
import { apiPaths } from "@/paths";
import { getAllUsers } from "@/services/users/get-all-users";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useColumns from "./use-columns";
import UsersTableEl from "./users-table-el";

export default function UsersTable() {
  const { data } = useQuery({
    queryKey: [apiPaths.users.root],
    queryFn: getAllUsers,
  });
  const { pagination, setPagination, TablePagination } = useTablePagination();
  const { columns } = useColumns();
  const table = useReactTable({
    columns,
    data: data ?? [],
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });

  return (
    <div className="flex w-fit flex-col justify-between">
      <UsersTableEl table={table} />
      <TablePagination className="rounded-lg bg-slate-200 p-2" table={table} />
    </div>
  );
}
