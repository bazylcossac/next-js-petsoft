"use client";
import { PetType } from "@/lib/types";
import React, { createContext, useContext, useState } from "react";

const PetContext = createContext<ContextTypes | null>(null);

type ContextTypes = {
  pets: PetType[];
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPetObject: PetType | undefined;
};

function PetContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: PetType[];
}) {
  const [pets] = useState<PetType[] | []>(data);
  const [selectedId, setSelectedId] = useState<string | null>(pets[0].id);

  const selectedPetObject = pets.find((pet) => pet.id === selectedId);
  return (
    <PetContext.Provider
      value={{ pets, selectedId, setSelectedId, selectedPetObject }}
    >
      {children}
    </PetContext.Provider>
  );
}

export function usePetsContext() {
  const petsContextData = useContext(PetContext);
  if (!petsContextData) {
    throw new Error("Context must be used within PetContext.Provider!");
  }

  return petsContextData;
}

export default PetContextProvider;
