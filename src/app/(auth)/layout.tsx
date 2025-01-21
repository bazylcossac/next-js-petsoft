import Logo from "@/components/Logo";
import React from "react";
import { SessionProvider } from "next-auth/react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col ">
      <Logo />
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
}

export default layout;
