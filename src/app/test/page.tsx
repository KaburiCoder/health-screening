import React from "react";
import { testApi } from "./server-api";
export const dynamic = 'force-dynamic';
export default async function TestPage() {
  // const data = await testApi();
  return (
    <div>
      {/* <div>{process.env.ENV_LOC}</div>
      <div>서버: {JSON.stringify(data)}</div>
      <div>주소: `{process.env.NEXT_PUBLIC_BACKEND_URL}`</div>
      <div>도메인: {process.env.NEXT_PUBLIC_DOMAIN}</div> */}
    </div>
  );
}
