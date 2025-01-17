import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { logIn, signUp } from "@/actions/actions";

type AuthFormTypes = {
  type: "login" | "signin";
};

function AuthForm({ type }: AuthFormTypes) {
  return (
    <form
      className="flex flex-col space-y-4"
      action={type === "login" ? logIn : signUp}
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>
      <Button>{type == "login" ? "Log In" : "Sign In"}</Button>
    </form>
  );
}

export default AuthForm;
