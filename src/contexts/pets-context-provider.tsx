"use client";
import { PetType } from "@/lib/types";
import React, { createContext, useContext, useState } from "react";

const PetContext = createContext<ContextTypes | null>(null);

type ContextTypes = {
  pets: PetType[];
  setPets: React.Dispatch<React.SetStateAction<PetType[] | []>>;
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPetObject: PetType | undefined;
  checkoutPet: (id: string) => void;
  addNewPet: (newPet: Omit<PetType, "id">) => void;
  addEditedPet: (editedPet: Omit<PetType, "id">) => void;
};

function PetContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: PetType[];
}) {
  const [pets, setPets] = useState<PetType[] | []>(data);
  const [selectedId, setSelectedId] = useState<string | null>(pets[0].id);

  const selectedPetObject = pets.find((pet) => pet.id === selectedId);
  function checkoutPet(id: string) {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedId(null);
  }

  function addNewPet(newPet: Omit<PetType, "id">) {
    const pet = { ...newPet, id: Date.now().toString() };
    setPets((prev) => [...prev, pet]);
  }

  function addEditedPet(editedPet: Omit<PetType, "id">) {
    const restOfPets = pets.filter((pet) => pet.id !== selectedId);
    const newPet: PetType = { id: selectedId!, ...editedPet };
    setPets([...restOfPets, newPet]);
  }
  return (
    <PetContext.Provider
      value={{
        pets,
        setPets,
        selectedId,
        setSelectedId,
        selectedPetObject,
        checkoutPet,
        addNewPet,
        addEditedPet,
      }}
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
