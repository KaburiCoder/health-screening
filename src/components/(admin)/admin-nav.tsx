"use client";
import { useServerCookie } from "@/lib/hooks/use-server-cookie";
import { useSignout } from "@/lib/hooks/use-signout";
import { cn } from "@/lib/utils";
import { paths } from "@/paths";
import { Button, User } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminNav() {
  const { user } = useServerCookie();
  const pathname = usePathname();
  const { handleSignout } = useSignout();

  return (
    <div className="flex h-full flex-col justify-between bg-slate-100">
      <div>
        <User
          className="m-2 my-4"
          name={user?.userId}
          description={user?.orgName}
          avatarProps={{
            src: paths.images.eClickIco,
            className: "p-2",
          }}
        />
        <ul>
          {linkPaths.map((link) => (
            <CustomLink
              key={link.href}
              linkPath={link}
              isActive={pathname.startsWith(link.href)}
            />
          ))}
        </ul>
      </div>
      <div className="m-2">
        <Button className="w-full" color="danger" onClick={handleSignout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
}

interface CustomLinkProps {
  linkPath: LinkPath;
  isActive: boolean;
}

function CustomLink({ linkPath, isActive }: CustomLinkProps) {
  return (
    <li className="h-fit overflow-hidden">
      <Link
        href={linkPath.href}
        className={cn(
          "m-2 my-0.5 block rounded p-2",
          "hover:bg-slate-300",
          isActive ? "border border-slate-400 bg-slate-200" : "",
        )}
      >
        {linkPath.text}
      </Link>
    </li>
  );
}

interface LinkPath {
  href: string;
  text: string;
}

const linkPaths: LinkPath[] = [
  { href: paths.adminSettings("common"), text: "공통 설정" },
  { href: paths.adminSettings("users"), text: "사용자 리스트" },
];
