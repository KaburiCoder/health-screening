"use client";
import { User } from "@/models/user";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTablePagination } from "@/lib/hooks/use-table-pagination";
import UsersTableEl from "./users-table-el";
import useColumns from "./use-columns";
import { useQuery } from "@tanstack/react-query";
import { apiPaths } from "@/paths";
import { getAllUsers } from "@/services/users/get-all-users";

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
