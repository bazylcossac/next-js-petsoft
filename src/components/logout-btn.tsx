"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { logOut } from "@/actions/actions";

function LogOutButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      onClick={async () => {
        startTransition(async () => {
          await logOut();
        });
      }}
      disabled={isPending}
    >
      {isPending ? "Signing out..." : "Sign Out"}
    </Button>
  );
}

export default LogOutButton;
