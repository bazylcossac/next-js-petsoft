import Logo from "@/components/Logo";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col ">
      <Logo />

      {children}
    </div>
  );
}

export default layout;
