"use client";
import { PetType } from "@/lib/types";
import React, { createContext, useContext, useState } from "react";

const PetContext = createContext<PetType[] | null>(null);

function PetContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: PetType[];
}) {
  const [pets] = useState<PetType[] | []>(data);

  //   useEffect(() => {
  //     const fetchPets = async () => {
  //       const response = await fetch(
  //         "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  //       );
  //       if (!response.ok) {
  //         throw new Error("htpp error");
  //       }
  //       const pets: PetType[] = await response.json();
  //       setPets(pets);
  //     };
  //     fetchPets();
  //   }, []);

  return <PetContext.Provider value={pets}>{children}</PetContext.Provider>;
}

export function usePetsContext() {
  const pets = useContext(PetContext);
  if (!pets) {
    throw new Error("Context must be used within PetContext.Provider!");
  }

  return pets;
}

export default PetContextProvider;
