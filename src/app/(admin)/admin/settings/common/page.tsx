import ManagerCodeForm from "@/components/(admin)/common/manager-code-form";
import { getAdminSettings } from "@/lib/api/server/get-admin-settings";
import React from "react";

export default async function AdminSettingsCommonPage() {
  const data = await getAdminSettings();

  return (
    <div className="mx-auto grid w-full sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
      <ManagerCodeForm managerCode={data.managerCode} />
    </div>
  );
}
