"use client";

import { useSearchContext } from "@/contexts/search-context-provider";
import React from "react";

function SearchForm() {
  const { inputValue, setInputValue } = useSearchContext();

  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white/30 rounded-lg hover:bg-white/50 focus:bg-white/70 outline-none transition p-4 text-lg text-black/80"
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
}

export default SearchForm;
