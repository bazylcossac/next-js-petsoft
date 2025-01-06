import { cn } from "@/lib/utils";
import React from "react";

function ContentBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "shadow-md overflow-hidden w-full h-full rounded-lg bg-[#F7F8FA]",
        className
      )}
    >
      {children}
    </div>
  );
}

export default ContentBlock;
