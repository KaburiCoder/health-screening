"use client";
import AccountHero from "@/components/(account)/account-hero";
import React from "react";
import { AccountBottom } from "../account-bottom";
import SignupForm from "./signup-form";

export default function SignupBody() {
  return (
    <AccountHero
      title="Sign in to ClickSoft"
      bottomIn={<AccountBottom type="signup" />}
    >
      <SignupForm />
    </AccountHero>
  );
}
