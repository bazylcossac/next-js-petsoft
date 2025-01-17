import { auth } from "@/app/auth";
import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import LogOutButton from "@/components/logout-btn";

import React from "react";

async function Page() {
  const session = await auth();
  return (
    <section className="my-8 ">
      <H1 className="text-white mb-10">Your account</H1>

      <ContentBlock className="flex flex-col items-center justify-center h-[500px] gap-4">
        Logged in as{" "}
        <span className="font-semibold">{session?.user?.email}</span>
        <LogOutButton />
      </ContentBlock>
    </section>
  );
}

export default Page;
