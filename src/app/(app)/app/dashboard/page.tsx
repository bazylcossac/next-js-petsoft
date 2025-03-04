import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import SearchForm from "@/components/search-form";
import Stats from "@/components/stats";

import SearchContextProvider from "@/contexts/search-context-provider";

import React from "react";

export default function Page() {
  return (
    <main>
      <div className="flex justify-between items-center mt-6 text-white">
        <Branding />
        <Stats />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[600px] mt-10">
        <SearchContextProvider>
          <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
            <SearchForm />
          </div>

          <div className="md:row-start-2 md:row-span-1 md:col-start-1 md:col-span-1 ">
            <ContentBlock className="relative">
              <PetList />
            </ContentBlock>
          </div>
        </SearchContextProvider>
        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
