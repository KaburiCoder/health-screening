"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import "../../styles/table.css";

import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "@/models/user";
import { Input } from "@nextui-org/react";
import { useTablePagination } from "@/lib/hooks/use-table-pagination";

const date = new Date();
const testUsers: User[] = [
  {
    userId: "z1",
    email: "z@z.com",
    orgName: "z소프트",
    roomKey: "z123",
    createdAt: date,
  },
  {
    userId: "x2",
    email: "x@x.com",
    orgName: "x소프트",
    roomKey: "x123",
    createdAt: date,
  },
  {
    userId: "v3",
    email: "v@v.com",
    orgName: "v소프트",
    roomKey: "v123",
    createdAt: date,
  },
  {
    userId: "C4",
    email: "C@C.com",
    orgName: "C소프트",
    roomKey: "C123",
    createdAt: date,
  },
  {
    userId: "z5",
    email: "z@z.com",
    orgName: "z소프트",
    roomKey: "z123",
    createdAt: date,
  },
  {
    userId: "x6",
    email: "x@x.com",
    orgName: "x소프트",
    roomKey: "x123",
    createdAt: date,
  },
  {
    userId: "v7",
    email: "v@v.com",
    orgName: "v소프트",
    roomKey: "v123",
    createdAt: date,
  },
  {
    userId: "C8",
    email: "C@C.com",
    orgName: "C소프트",
    roomKey: "C123",
    createdAt: date,
  },
  {
    userId: "z9",
    email: "z@z.com",
    orgName: "z소프트",
    roomKey: "z123",
    createdAt: date,
  },
  {
    userId: "x0",
    email: "x@x.com",
    orgName: "x소프트",
    roomKey: "x123",
    createdAt: date,
  },
  {
    userId: "v11",
    email: "v@v.com",
    orgName: "v소프트",
    roomKey: "v123",
    createdAt: date,
  },
  {
    userId: "C12",
    email: "C@C.com",
    orgName: "C소프트",
    roomKey: "C123",
    createdAt: date,
  },
  {
    userId: "z13",
    email: "z@z.com",
    orgName: "z소프트",
    roomKey: "z123",
    createdAt: date,
  },
  {
    userId: "x14",
    email: "x@x.com",
    orgName: "x소프트",
    roomKey: "x123",
    createdAt: date,
  },
  {
    userId: "v15",
    email: "v@v.com",
    orgName: "v소프트",
    roomKey: "v123",
    createdAt: date,
  },
  {
    userId: "C16",
    email: "C@C.com",
    orgName: "C소프트",
    roomKey: "C123",
    createdAt: date,
  },
  {
    userId: "z17",
    email: "z@z.com",
    orgName: "z소프트",
    roomKey: "z123",
    createdAt: date,
  },
  {
    userId: "x18",
    email: "x@x.com",
    orgName: "x소프트",
    roomKey: "x123",
    createdAt: date,
  },
  {
    userId: "v19",
    email: "v@v.com",
    orgName: "v소프트",
    roomKey: "v123",
    createdAt: date,
  },
  {
    userId: "C20",
    email: "C@C.com",
    orgName: "C소프트",
    roomKey: "C123",
    createdAt: date,
  },
  {
    userId: "C21",
    email: "C@C.com",
    orgName: "C소프트",
    roomKey: "C123",
    createdAt: date,
  },
];
export default function Test2Page() {
  const [users, setUsers] = useState<User[]>(testUsers);
  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: () => <span>ID</span>,
        accessorFn: (row) => row.userId,
        id: "userId",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: () => <span>기관명</span>,
        accessorFn: (row) => row.orgName,
        id: "orgName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: () => "Email",
        accessorFn: (row) => row.email,
        id: "email",
        footer: (props) => props.column.id,
      },
      {
        header: () => "연결코드",
        accessorFn: (row) => row.roomKey,
        id: "roomKey",
        footer: (props) => props.column.id,
      },
      {
        header: () => "계정생성일시",
        accessorFn: (row) => row.createdAt,
        id: "createdAt",
        cell: (props) =>
          dayjs(props.getValue() as Date).format("YYYY-MM-DD HH:mm:ss"),
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  return (
    <div className="flex h-screen items-center justify-center">
      <MyTable data={users} columns={columns} />
    </div>
  );
}

function MyTable({
  data,
  columns,
}: {
  data: User[];
  columns: ColumnDef<User>[];
}) {
  const { pagination, setPagination, TablePagination } = useTablePagination();

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: { pagination },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
  });

  return (
    <div className="flex flex-col justify-between">
      <div className="min-h-[35rem] overflow-y-auto p-2">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        ) : null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="p-1 px-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <TablePagination table={table} />
    </div>
  );
}

function Filter({ column }: { column: Column<any, any> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <Input
      className="w-36 p-1 text-base"
      onChange={(e) => column.setFilterValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      placeholder={`Search...`}
      color="primary"
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}
