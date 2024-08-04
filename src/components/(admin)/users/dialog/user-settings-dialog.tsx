import { SaveDialog } from "@/components/save-dialog";
import { Input } from "@/components/ui/input";
import { ModalProps } from "@/lib/props/modal-props";
import { User } from "@/models/user";
import { UserSettings } from "@/models/user-settings";
import { apiPaths } from "@/paths";
import { updateUser } from "@/services/users/update-user";
import { Button, Checkbox } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChildrenProps } from "kbr-nextjs-shared/props";
import React, { useEffect, useState } from "react";
import { useUserSettings } from "../hooks/use-user-settings";

export interface UserSettingsDialogProps extends ModalProps {
  user: User;
}

export const UserSettingsDialog = (props: UserSettingsDialogProps) => {
  const { isOpen, user } = props;
  const {
    orgName,
    email,
    settings,
    isPending,
    deleteMutate,
    setEmail,
    setOrgName,
    handleSubmit,
    handleServiceSelectedChange,
  } = useUserSettings(props);

  function handleDeleteUser(): void {
    const id = prompt("계정을 삭제하시려면 계정의 아이디를 입력해주세요.");
    if (id?.toLowerCase() === user.userId.toLowerCase()) {
      deleteMutate({ id: user.id });
    } else if (id) {
      alert("아이디를 다시 입력해주세요.");
    }
  }

  return (
    <SaveDialog
      className="min-w-[30rem]"
      title="사용자 설정"
      isOpen={isOpen}
      isDisabled={isPending}
      onOpenChange={props.onOpenChange}
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-4 gap-2">
        <LabeldItem label="아이디">{user.userId} </LabeldItem>
        <LabeldItem label="기관명">
          <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} />
        </LabeldItem>
        <LabeldItem label="Email">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </LabeldItem>
        <LabeldItem label="부가 서비스">
          <div className="flex gap-4">
            <Checkbox
              isSelected={settings?.webApp?.use}
              onValueChange={handleServiceSelectedChange.bind(null, "webApp")}
            >
              Web App
            </Checkbox>
            <Checkbox
              isSelected={settings?.clickDesk?.use}
              onValueChange={handleServiceSelectedChange.bind(
                null,
                "clickDesk",
              )}
            >
              Click Desk
            </Checkbox>
            <Checkbox
              isSelected={settings?.questionnaire?.use}
              onValueChange={handleServiceSelectedChange.bind(
                null,
                "questionnaire",
              )}
            >
              문진표
            </Checkbox>
          </div>
        </LabeldItem>

        <Button
          onClick={handleDeleteUser}
          color="danger"
          variant="faded"
          className="col-span-4"
        >
          계정 삭제
        </Button>
      </div>
    </SaveDialog>
  );
};

export interface LabeldItemProps extends ChildrenProps {
  label: string;
}
export const LabeldItem = ({ label, children }: LabeldItemProps) => {
  return (
    <>
      <div className="rounded bg-purple-100 p-2 text-center">{label}</div>
      <div className="col-span-3 flex items-center">{children}</div>
    </>
  );
};
