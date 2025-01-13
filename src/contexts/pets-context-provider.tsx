"use client";
import { addPetToDb, deletePetFromDb, editPetInDb } from "@/actions/actions";
import { PetType } from "@/lib/types";
import { toast } from "sonner";

import React, {
  createContext,
  useContext,
  useOptimistic,
  useState,
} from "react";

const PetContext = createContext<ContextTypes | null>(null);

type ContextTypes = {
  pets: PetType[];
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPetObject: PetType | undefined;
  addNewPet: (
    petData: Omit<PetType, "id">
  ) => Promise<void> | { message: string };
  addEditedPet: (
    newPetFormData: Omit<PetType, "id">,
    selectedId: string
  ) => Promise<void> | { message: string };
  deletePet: (petId: string) => void;
};

function PetContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: PetType[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(data[0].id);
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, newPet) => [...state, { id: Math.random().toString(), ...newPet }]
  );

  const selectedPetObject = optimisticPets.find((pet) => pet.id === selectedId);

  async function addNewPet(petData: Omit<PetType, "id">) {
    setOptimisticPets(petData);
    const error = await addPetToDb(petData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  }

  async function addEditedPet(
    newPetFormData: Omit<PetType, "id">,
    selectedId: string
  ) {
    setOptimisticPets(newPetFormData);
    const error = await editPetInDb(newPetFormData, selectedId);
    if (error) {
      toast.warning(error.message);
      return;
    }
  }
  async function deletePet(petId: string) {
    await deletePetFromDb(petId);
  }
  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
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
