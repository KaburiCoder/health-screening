import React from "react";
import Filter from "./filter";
import { Table, flexRender } from "@tanstack/react-table";
import { User } from "@/models/user";
import { UsersTableRow } from "./users-table-row";

interface Props {
  table: Table<User>;
}
export default function UsersTableEl({ table }: Props) {
  return (
    <div className=" overflow-y-auto p-2">
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
            return <UsersTableRow key={row.id} row={row} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
