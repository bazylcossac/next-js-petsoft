"use client";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    name: "Dashboard",
    path: "/app/dashboard",
  },
  {
    name: "Account",
    path: "/app/account",
  },
];

function AppHeader() {
  const currentPath = usePathname();

  return (
    <header className="flex flex-row justify-between py-4 border-b border-white/40">
      <Logo />
      <nav>
        <ul className="flex gap-6">
          {routes.map((route) => (
            <li
              key={route.path}
              className={cn(
                " px-1 py-1 text-white/70 font-semibold rounded-sm hover:text-white focus:text-white",
                currentPath === route.path &&
                  "bg-black/10 text-white transition"
              )}
            >
              <Link href={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
