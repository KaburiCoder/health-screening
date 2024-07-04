import { DoctorDragging } from "../libs/doctor_dragging";
import { DoctorState } from "../../../../../models/doctor-state";

interface DoctorCardProps {
  state: DoctorState;
}

export const DoctorCard = ({ state }: DoctorCardProps) => {
  const { code, name, jinchalName, kwamokName } = state;

  return (
    <li
      className="flex flex-col gap-2 rounded bg-white p-2 min-w-44"
      draggable
      onDragStart={DoctorDragging.handleDragStart.bind(null, state)}
    >
      <div>
        <span className="mr-4 font-bold text-blue-500">
          {code + " " + jinchalName}
        </span>
      </div>
      <div>
        <span className="mr-4">{name}</span>
        <span className="text-sm text-gray-500">{kwamokName}</span>
      </div>
    </li>
  );
};
