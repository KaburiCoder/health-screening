"use client";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";
import { WindowScrollProvider } from "./window-scroll.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketIOProvider } from "kbr-nextjs-shared";
import { useMobileVh } from "kbr-react-hooks";
import { EnvData } from "@/contants/env-data";

const queryClient = new QueryClient();
export function Providers({ children }: { children: React.ReactNode }) {
  useMobileVh();

  return (
    <NextUIProvider className="min-h-screen bg-background font-sans antialiased">
      <QueryClientProvider client={queryClient}>
        <SocketIOProvider uri={EnvData.BASE_URL} path="/api/socket.io">
          <WindowScrollProvider>
            {children}
            <Toaster />
          </WindowScrollProvider>
        </SocketIOProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
}
