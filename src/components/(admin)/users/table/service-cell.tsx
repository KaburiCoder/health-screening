import { User } from "@/models/user";
import { CellContext } from "@tanstack/react-table";
import { ServiceBadge } from "./service-badge";
 
export const ServiceCell = (props: CellContext<User, unknown>) => {
  const settings = props.row.original.settings;

  return (
    <div className="flex gap-1">
      {settings?.clickDesk?.use && <ServiceBadge>Click Desk</ServiceBadge>}
      {settings?.webApp?.use && <ServiceBadge>Web App</ServiceBadge>}
      {settings?.questionnaire?.use && <ServiceBadge>문진표</ServiceBadge>}
    </div>
  );
};
