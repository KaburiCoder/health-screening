"use client";
import React, { useEffect, useState } from "react";
import { clientApi } from "./client-api";

export default function Test2() {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    clientApi()
      .then((v) => setData(v))
      .catch((err) => setError(err));
  }, []);

  return (
    <div className="bg-blue-200">
      <div>data: {JSON.stringify(data)}</div>
      <div>error: {JSON.stringify(error)}</div>
    </div>
  );
}
