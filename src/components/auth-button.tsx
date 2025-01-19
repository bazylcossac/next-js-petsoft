"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

function AuthButton({ type }: { type: "login" | "signin" }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {type === "login"
        ? pending
          ? "Logging... "
          : "Log In"
        : pending
        ? "Signing..."
        : "Sign Up"}
    </Button>
  );
}

export default AuthButton;
