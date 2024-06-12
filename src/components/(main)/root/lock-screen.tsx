"use client";
import { cn } from "@/lib/utils";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useLockpw } from "./_hooks/use-lock-pw";

export const lockScreen = (Component: any) => {
  return function LockScreen(props: any) {
    const [lock, setLock] = useState(true);
    const component = <Component {...props} />;

    return (
      <div className="relative">
        <div className={cn("absolute z-10 h-full w-full", lock ? "blur" : "")}>
          {component}
        </div>
        {lock && <LockCard onSuccess={() => setLock(false)} />}
      </div>
    );
  };
};

interface LockCardProps {
  onSuccess: () => void;
}

function LockCard({ onSuccess }: LockCardProps) {
  const [pwds, setPwds] = useState<number[]>([]);
  const { lockPw, reloadLockpw } = useLockpw();
  function handleNumClick(num: number): void {
    setPwds((prev) => {
      if (prev.length < 4) {
        return prev.concat(num);
      }
      return [num];
    });
  }

  function handleClear(): void {
    setPwds([]);
  }

  useEffect(() => {
    if (!lockPw) return reloadLockpw();
    const ok = pwds.join("") === lockPw;
    if (ok) onSuccess();
  }, [pwds, lockPw]);

  return (
    <Card className="fixed left-1/2 top-1/2 z-10 min-w-80 -translate-x-1/2 -translate-y-1/2 p-4">
      <CardHeader>잠금화면</CardHeader>
      <CardBody className="grid grid-cols-3 gap-2">
        <div className="col-span-3 mb-2 grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((n) => (
            <Input
              key={n}
              readOnly
              value={pwds?.[n]?.toString() ?? ""}
              className="w-14"
              variant="underlined"
              type="password"
              classNames={{ input: "text-center text-xl" }}
            />
          ))}
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <Button
            key={num}
            variant="bordered"
            color="primary"
            onClick={handleNumClick.bind(null, num)}
          >
            {num}
          </Button>
        ))}
        <Button className="col-span-2" variant="bordered" onClick={handleClear}>
          지움
        </Button>
      </CardBody>
    </Card>
  );
}
