import MainHeader from "@/components/(main)/root/header/header";
import { ChildrenProps } from "kbr-nextjs-shared/props";
import React from "react";

export default function MainLayout({ children }: ChildrenProps) {
  return (
    <>
      <MainHeader />
      <main className="w-full select-none">
        <div className="mx-auto flex max-w-screen-lg2 flex-col gap-8 px-4 md:px-20">
          {children}
        </div>
      </main>
    </>
  );
}
