"use client";

import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext<ContextTypes | null>(null);

type ContextTypes = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

function SearchContextProvider({ children }: { children: React.ReactNode }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <SearchContext.Provider
      value={{
        inputValue,
        setInputValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const searchContextValue = useContext(SearchContext);
  if (!searchContextValue) {
    throw new Error("Context must be used within PetContext.Provider!");
  }

  return searchContextValue;
}

export default SearchContextProvider;
