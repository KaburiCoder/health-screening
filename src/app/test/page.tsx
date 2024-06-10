import React from "react";
import { testApi } from "./server-api";
export const dynamic = 'force-dynamic';
export default async function TestPage() {
  // const data = await testApi();
  return (
    <div>
      <div>NEXT_ENV: {process.env.NEXT_ENV}</div>
      <div>NEXT_PUBLIC_SERVER_URL: {process.env.NEXT_PUBLIC_SERVER_URL}</div>
      <div>ADMIN_KEY: {process.env.ADMIN_KEY}</div>      
    </div>
  );
}
