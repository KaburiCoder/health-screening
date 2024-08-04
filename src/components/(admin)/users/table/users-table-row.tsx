import { User } from "@/models/user";
import { useDisclosure } from "@nextui-org/react";
import { Row, flexRender } from "@tanstack/react-table";
import { UserSettingsDialog } from "../dialog/user-settings-dialog";

interface Props {
  row: Row<User>;
}
export const UsersTableRow = ({ row }: Props) => {
  const disclosure = useDisclosure();

  return (
    <>
      <UserSettingsDialog user={row.original} {...disclosure} />
      <tr
        key={row.id}
        className="hover:cursor-pointer hover:bg-blue-50"
        onClick={disclosure.onOpen}
      >
        {row.getVisibleCells().map((cell) => {
          return (
            <td key={cell.id} className="p-1 px-4">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        })}
      </tr>
    </>
  );
};
