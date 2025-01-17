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
  const [selectedId, setSelectedId] = useState<string | null>(
    data[0].id || null
  );
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { id: Math.random().toString(), ...payload }];
        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload.newPetFormData };
            }
            return pet;
          });
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    }
  );

  const selectedPetObject = optimisticPets.find((pet) => pet.id === selectedId);

  async function addNewPet(petData: Omit<PetType, "id">) {
    setOptimisticPets({ action: "add", payload: petData });
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
    setOptimisticPets({ action: "edit", payload: newPetFormData });
    const error = await editPetInDb(newPetFormData, selectedId);
    if (error) {
      toast.warning(error.message);
      return;
    }
  }

  async function deletePet(petId: string) {
    setOptimisticPets({ action: "delete", payload: petId });
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
