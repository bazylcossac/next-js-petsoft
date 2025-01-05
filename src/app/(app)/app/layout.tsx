import AppBackground from "@/components/appbackground";
import AppFooter from "@/components/appfooter";
import AppHeader from "@/components/appheader";
import PetContextProvider from "@/contexts/pets-context-provider";
import { PetType } from "@/lib/types";
import React from "react";

async function Layout({ children }: { children: React.ReactNode }) {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  if (!response.ok) {
    throw new Error("htpp error");
  }
  const pets: PetType[] = await response.json();

  return (
    <div>
      <AppBackground />
      <div className="max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen">
        <AppHeader />
        <PetContextProvider data={pets}>{children}</PetContextProvider>
        <AppFooter />
      </div>
    </div>
  );
}

export default Layout;
