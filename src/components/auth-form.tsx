import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function AuthForm({ type }: { type: "login" | "signin" }) {
  return (
    <form className="flex flex-col space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
      <Button>{type == "login" ? "Log In" : "Sign In"}</Button>
    </form>
  );
}

export default AuthForm;
