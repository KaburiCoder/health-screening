import React from "react";
import { testApi } from "./server-api";
import { EnvData } from "@/contants/env-data";
import Test2 from "./test2";

export default async function TestPage() {
  const data = await testApi();
  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      <div>---------------</div>
      <div>BASE_URL: {EnvData.CLIENT_URL}</div>
      <div>NEXT_ENV: {process.env.NEXT_ENV}</div>
      <div>NEXT_PUBLIC_SERVER_URL: {process.env.NEXT_PUBLIC_SERVER_URL}</div>
      <div>ADMIN_KEY: {process.env.ADMIN_KEY}</div>
      <Test2 />
    </div>
  );
}
