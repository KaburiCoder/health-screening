import ErrorBox from "@/components/error-box";
import { isNumber } from "@/stores/utils/check-util";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { useLockpw } from "../_hooks/use-lock-pw";

export default function SettingBody() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="whitespace-nowrap">잠금 비밀번호</div>
        <LockPwInputs />
      </div>
    </div>
  );
}

function LockPwInputs() {
  const { isLoading, lockPw, mutate } = useLockpw();

  const [pw, setPw] = useState<string[]>([]);
  const [error, setError] = useState<string>();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // 테스트
  const [myKey, setMyKey] = useState<string>("키입력");

  // 입력란에 대한 ref 설정
  const setInputRef = (index: number) => (element: HTMLInputElement | null) => {
    inputRefs.current[index] = element;
  };

  // 다음 입력란으로 포커스 이동
  const focusNextInput = (currentIndex: number) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < inputRefs.current.length) {
      inputRefs.current[nextIndex]?.focus();
    } else {
      buttonRef.current?.focus();
    }
  };

  // function handleKeyDown(
  //   key: string,
  //   code: string,
  //   index: number,
  //   preventDefault: () => void,
  // ): void {
  //   setMyKey(`key: ${key}, code: ${code}`);

  //   preventDefault();

  //   if (isNumber(key)) {
  //     setPw((prev) => {
  //       prev[index] = key;
  //       return [...prev];
  //     });
  //     focusNextInput(index);
  //   }
  // }

  function handleSave(): void {
    if (!pw.every((p) => isNumber(p))) {
      setError("잠금 코드를 모두 입력해주세요.");
      return;
    }
    setError(undefined);
    mutate(pw.join(""));
  }

  useEffect(() => {
    if (!lockPw) return;

    setPw([
      lockPw.slice(0, 1),
      lockPw.slice(1, 2),
      lockPw.slice(2, 3),
      lockPw.slice(3, 4),
    ]);
  }, [lockPw]);

  useEffect(() => {
    for (const input of inputRefs.current) {
      input?.addEventListener("keydown", handleKeyDown.bind(input, setMyKey));
    }

    return () => {
      for (const input of inputRefs.current) {
        input?.removeEventListener("keydown", handleKeyDown.bind(input, setMyKey));
      }
    };
  }, []);

  return (
    <div>
      {myKey}
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((n) => (
          <Input
            key={n}
            className="max-w-14 text-base"
            classNames={{ input: "text-center" }}
            variant="bordered"
            min={0}
            max={9}
            value={pw[n] ?? ""}
            // onKeyDown={(e) => handleKeyDown(e.key, e.code, n, e.preventDefault)}
            ref={setInputRef(n)} // ref 설정
          />
        ))}
        <Button
          ref={buttonRef}
          className="text-white"
          isLoading={isLoading}
          color="success"
          onClick={handleSave}
        >
          저장
        </Button>
      </div>
      <ErrorBox errorMessage={error} />
    </div>
  );
}

function handleKeyDown(
  this: HTMLInputElement,
  setMyKey: any,
  ev: KeyboardEvent,
) {
  ev.preventDefault();

  // ): void {
  setMyKey(`key: ${ev.key}, code: ${ev.code}`);

  //   preventDefault();

  //   if (isNumber(key)) {
  //     setPw((prev) => {
  //       prev[index] = key;
  //       return [...prev];
  //     });
  //     focusNextInput(index);
  //   }
}