"use client";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";
import { WindowScrollProvider } from "./window-scroll.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketIOProvider } from "kbr-nextjs-shared";
import { useMobileVh } from "kbr-react-hooks";
import { EnvData } from "@/contants/env-data";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();
export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const namespace = getSocketNamespace(pathname);
  useMobileVh();

  console.log(`${EnvData.SOCKET_URL}${namespace}`);
  
  return (
    <NextUIProvider className="min-h-screen bg-background font-sans antialiased">
      <QueryClientProvider client={queryClient}>
        <SocketIOProvider uri={`${EnvData.SOCKET_URL}${namespace}`}>
          <WindowScrollProvider>
            {children}
            <Toaster />
          </WindowScrollProvider>
        </SocketIOProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
}

function getSocketNamespace(pathname: string) {  
  if (pathname.startsWith("/clickdesk")) return "/click-desk";
  return "/hs";
}
