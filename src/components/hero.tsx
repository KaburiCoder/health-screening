"use client";
import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ClickIcon from "@/components/images/click-icon";

interface Props {
  navComponent: React.ReactNode;
  mainComponent: React.ReactNode;
  startContent?: React.ReactNode;
  centerContent?: React.ReactNode;
}
export function Hero({
  startContent,
  centerContent,
  mainComponent,
  navComponent,
}: Props) {
  return (
    <div>
      <header className="sticky top-0 flex h-[3rem] w-full items-center justify-between bg-slate-600 px-2 z-50">
        <div className="relative h-full w-full">
          <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center gap-2 text-white">
            <ClickIcon />
            {startContent}
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
            {centerContent}
          </div>
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-2">
            <Sheet>
              <SheetTrigger>
                <div className="rounded p-2 hover:bg-purple-100 md:hidden">
                  <Menu />
                </div>
              </SheetTrigger>
              <SheetContent className="p-0">{navComponent}</SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <nav className="fixed left-0 hidden h-[calc(100%-3rem)] w-[12rem] border-r border-r-slate-200 md:block">
        {navComponent}
      </nav>
      <main className="md:ml-[12rem]">{mainComponent}</main>
    </div>
  );
}
