import { DoctorState } from "@/models/doctor-state";

const doctorDraggingKey: string = "doctor_dragging";
export class DoctorDragging {
  static handleDragStart(state: DoctorState, e: React.DragEvent<HTMLLIElement>): void {
    e.dataTransfer.setData(
      doctorDraggingKey,
      JSON.stringify(state),
    );
  }

  static handleDrop(onDropped: (state: DoctorState) => void, e: React.DragEvent<HTMLDivElement>): void {
    const data = e.dataTransfer.getData(doctorDraggingKey);
    if (!data) return;
    let doctorState = JSON.parse(data) as DoctorState;
    doctorState = Object.assign(new DoctorState(), doctorState);
    if (!doctorState.kwamokName) {
      doctorState.kwamokName = "미등록";
    }

    onDropped(doctorState);
  }

  static handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
}
