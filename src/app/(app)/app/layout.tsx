import AppBackground from "@/components/appbackground";
import AppFooter from "@/components/appfooter";
import AppHeader from "@/components/appheader";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/contexts/pets-context-provider";
import { prisma } from "@/lib/db";
import { auth } from "@/app/auth";
import React from "react";
import { redirect } from "next/navigation";

async function Layout({ children }: { children: React.ReactNode }) {
  // const loggedUser = await prisma.get()
  const petsData = await prisma.pet.findMany();

  const session = await auth();

  if (!session) return redirect("/login");
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <AppBackground />
      <div className="max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen">
        <AppHeader />
        <PetContextProvider data={petsData}>{children}</PetContextProvider>
        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default Layout;
