"use client";
import { addPetToDb, deletePetFromDb, editPetInDb } from "@/actions/actions";
import { PetType } from "@/lib/types";

import React, { createContext, useContext, useState } from "react";

const PetContext = createContext<ContextTypes | null>(null);

type ContextTypes = {
  pets: PetType[];
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPetObject: PetType | undefined;
  addNewPet: (petFormData: FormData) => void;
  addEditedPet: (newPetFormData: FormData, selectedId: string) => void;
  deletePet: (petId: string) => void;
};

function PetContextProvider({
  children,
  data: pets,
}: {
  children: React.ReactNode;
  data: PetType[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(pets[0].id);

  const selectedPetObject = pets.find((pet) => pet.id === selectedId);

  async function addNewPet(petFormData: FormData) {
    await addPetToDb(petFormData);
  }

  async function addEditedPet(newPetFormData: FormData, selectedId: string) {
    await editPetInDb(newPetFormData, selectedId);
  }
  async function deletePet(petId: string) {
    await deletePetFromDb(petId);
  }
  return (
    <PetContext.Provider
      value={{
        pets,
        selectedId,
        selectedPetObject,
        setSelectedId,
        addNewPet,
        addEditedPet,
        deletePet,
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
