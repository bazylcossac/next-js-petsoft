import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import React from "react";

function Page() {
  return (
    <div className="flex items-center flex-col gap-10">
      <H1>PetSoft access requires payment</H1>
      <Button>Gain access for 299$</Button>
    </div>
  );
}

export default Page;
