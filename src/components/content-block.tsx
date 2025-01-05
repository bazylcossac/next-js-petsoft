import React from "react";

function ContentBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="shadow-md overflow-hidden w-full h-full rounded-lg bg-[#F7F8FA]">
      {children}
    </div>
  );
}

export default ContentBlock;
