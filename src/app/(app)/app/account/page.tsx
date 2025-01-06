import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import React from "react";

function Page() {
  return (
    <section className="my-8 ">
      <H1 className="text-white mb-10">Your account</H1>

      <ContentBlock className="flex flex-col items-center justify-center h-[500px] gap-4">
        Logged in as example@gmail.com
        <Button>Sign out</Button>
      </ContentBlock>
    </section>
  );
}

export default Page;
