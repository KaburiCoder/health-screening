"use client";
import { ClickBodyWrapper } from "@/components/(clickdesk)/clickdesk-body-wrapper";
import { GridTitle } from "@/components/grid-title";
import { InputX } from "@/components/ui/input-x";
import { useServerCookie } from "@/lib/hooks/use-server-cookie";
import React from "react";

const HospInfoPage = () => {
  const { user } = useServerCookie();
  return (
    <ClickBodyWrapper title="병원정보 설정">
      <div className="grid" style={{ gridTemplateColumns: "5rem 1fr" }}>
        <div className="flex-center border-b border-r border-orange-200 bg-amber-100 p-4">
          병원명
        </div>
        <div className="border-b border-r border-orange-200 p-2">
          <InputX value={user?.orgName ?? ""} />
        </div>
      </div>
    </ClickBodyWrapper>
  );
};

export default HospInfoPage;
