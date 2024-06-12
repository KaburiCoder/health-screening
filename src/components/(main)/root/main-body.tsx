"use client";
import React, { useMemo, useState } from "react";
import { useServerCookie } from "@/lib/hooks/use-server-cookie";
import { EvPaths } from "@/socket-io/ev-paths";
import {
  GetReceptionPatientsArgs,
  GetReceptionPatientsResult,
  ReceptionPatient,
} from "health-screening-shared/interfaces.socket";
import { Button, Divider, Input } from "@nextui-org/react";
import { useEffect } from "react";
import { PatientCard } from "./patient-card";
import { RefreshCw, Search } from "lucide-react";
import toast from "react-hot-toast";
import { useSearchText } from "@/lib/hooks/use-search-text";
import { useInterval } from "@/lib/hooks/use-interval";
import { useEmitX } from "@/lib/hooks/use-emit-x";

export default function MainBody() {
  const { user } = useServerCookie();
  const { data, isConnected, emitAck } = useEmitX<
    GetReceptionPatientsArgs,
    GetReceptionPatientsResult
  >({
    ev: EvPaths.GetReceptionPatients,
    onSuccess: ({ status, message }) => {
      if (status === "error") {
        toast.error(message ?? "알 수 없는 오류가 발생했습니다.");
      }
    },
  });

  const processedData = useMemo(
    () => (data?.status === "success" ? data?.data : []),
    [data],
  );
  const { searchedData, setSearchText } = useSearchText<ReceptionPatient>({
    data: processedData,
    filter: ({ searchText, value }) => {
      const regex = new RegExp(searchText.trim(), "i");
      return value.name.match(regex);
    },
  });

  const emitIfConnected = () => {
    
    if (isConnected && user?.roomKey) {
      emitAck({ key: user.roomKey });
    }
  };

  useInterval(emitIfConnected, 10000);

  useEffect(() => {
    emitIfConnected();
  }, [isConnected, user]);

  useEffect(() => {
    if (data?.error) {
      toast.error(data.message ?? "");
    }
  }, [data?.error]);
  function handleReload(): void {
    if (user) emitAck({ key: user.roomKey });
  }

  const cards = searchedData?.map((d) => (
    <PatientCard key={`${d.eiAuto},${d.ejAuto}`} data={d} />
  ));

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchText(e.target.value);
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-white ">
        <div>
          <div className="mx-auto flex max-w-screen-lg items-center justify-between px-4">
            <h2 className="mb-2 mt-4 text-2xl font-bold">
              검진 접수 환자 리스트
            </h2>
            <div className="flex gap-2">
              <Input
                startContent={<Search />}
                className="text-base"
                placeholder="이름 검색"
                onChange={handleSearch}
              />
              <Button
                variant="bordered"
                startContent={<RefreshCw />}
                onClick={handleReload}
              ></Button>
            </div>
          </div>
        </div>
        <Divider className="my-2" />
      </div>
      <main className="mx-auto flex max-w-screen-lg flex-col justify-between space-y-4 px-6 py-6">
        {cards}
      </main>
    </>
  );
}
