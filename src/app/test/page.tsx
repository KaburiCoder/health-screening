"use client";
import { axClient } from "@/lib/api/ax-client";
import { Button } from "@nextui-org/react";
import React from "react";
import { testApi } from "./server-api";

export default function TestPage() {
  return (
    <div>
      <Button
        onClick={() => {
          testApi();
        }}
      >
        Test
      </Button>
      <div>주소: `{process.env.NEXT_PUBLIC_BACKEND_URL}`</div>
      <div>
        ingress: `{"ingress-nginx-controller.ingress-nginx.svc.cluster.local"}`
      </div>
    </div>
  );
}
