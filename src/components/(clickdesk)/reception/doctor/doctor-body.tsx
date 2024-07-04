import React from "react";
import { RegistDoctorPanel } from "./_components/regist-doctor-panel";
import DoctorBoxes from "./_components/doctor-boxes";
import { Dot } from "lucide-react";
import { ClickBodyWrapper } from "../../clickdesk-body-wrapper";

const DoctorBody = () => (
  <ClickBodyWrapper title="진료의사 설정">
    <div className="flex items-center py-2">
      <Dot />
      <span>우측의 진료실을 좌측으로 드래그하여 등록하세요</span>
    </div>
    <div className="flex min-h-[70vh]">
      <RegistDoctorPanel />
      <DoctorBoxes />
    </div>
  </ClickBodyWrapper>
);

export default DoctorBody;

