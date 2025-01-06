"use client";
import { usePetsContext } from "@/contexts/pets-context-provider";
import { useSearchContext } from "@/contexts/search-context-provider";
import { PetType } from "@/lib/types";
import { cn } from "@/lib/utils";

import Image from "next/image";
import React from "react";

function PetList() {
  const { pets, setSelectedId, selectedId } = usePetsContext();
  const { inputValue } = useSearchContext();

  const filteretPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <ul className="bg-white">
      {filteretPets.map((pet: PetType) => (
        <li key={pet.id}>
          <button
            className={cn(
              "flex flex-row items-center py-2 px-2 gap-4 w-full hover:bg-[#e6e6e6] focus:bg-[#e6e6e6] transition outline-none",
              {
                "bg-[#e6e6e6]": selectedId === pet.id,
              }
            )}
            onClick={() => setSelectedId(pet.id)}
          >
            <Image
              src={pet.imageUrl}
              alt={`${pet.name} image`}
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="text-base font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PetList;
