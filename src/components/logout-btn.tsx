"use client";
import React from "react";
import { Button } from "./ui/button";
import { logOut } from "@/actions/actions";

function LogOutButton() {
  return <Button onClick={() => logOut()}>Sign Out</Button>;
}

export default LogOutButton;
