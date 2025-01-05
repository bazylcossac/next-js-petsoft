import AppBackground from "@/components/appbackground";
import AppFooter from "@/components/appfooter";
import AppHeader from "@/components/appheader";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppBackground />
      <div className="max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </div>
  );
}

export default Layout;
