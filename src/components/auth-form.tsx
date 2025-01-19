"use client";
import React, { useActionState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { logIn, signUp } from "@/actions/actions";
import AuthButton from "@/components/auth-button";
import { toast } from "sonner";

type AuthFormTypes = {
  type: "login" | "signin";
};

function AuthForm({ type }: AuthFormTypes) {
  const [signUpError, signUpAction] = useActionState(signUp, null);
  const [logInError, logInAction] = useActionState(logIn, null);

  return (
    <form
      action={type === "login" ? logInAction : signUpAction}
      className="flex flex-col space-y-4"
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <AuthButton type={type} />
      {signUpError && (
        <p className="text-red-500 text-sm font-semibold">
          {signUpError.message}
        </p>
      )}
      {logInError && (
        <p className="text-red-500 text-sm font-semibold">
          {logInError.message}
        </p>
      )}
    </form>
  );
}

export default AuthForm;
