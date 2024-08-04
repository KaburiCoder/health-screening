'use client';

import { useState } from "react";

export const useSignupState = () => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [roomKey, setRoomKey] = useState<string>("");
  const [orgName, setOrgName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  function handleChangeUserId(e: React.ChangeEvent<HTMLInputElement>) {
    setUserId(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleChangeConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  function handleChangeRoomKey(e: React.ChangeEvent<HTMLInputElement>) {
    setRoomKey(e.target.value);
  }

  function handleChangeOrgName(e: React.ChangeEvent<HTMLInputElement>) {
    setOrgName(e.target.value);
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  return {
    userId,
    password,
    confirmPassword,
    roomKey,
    orgName,
    email,
    handleChangeUserId,
    handleChangePassword,
    handleChangeConfirmPassword,
    handleChangeRoomKey,
    handleChangeOrgName,
    handleChangeEmail,
  };
};