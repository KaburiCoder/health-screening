import { User } from "@/models/user";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import React from "react";

export default function useColumns() {
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

  return { columns };
}
