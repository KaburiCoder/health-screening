"use client";
import { paths } from "@/paths";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminHeaderCenter() {
  const pathname = usePathname();

  return <>{pathNames[pathname]}</>;
}

const pathNames = {
  [paths.adminSettings("common")]: "공통 설정",
  [paths.adminSettings("users")]: "사용자 리스트",
};
