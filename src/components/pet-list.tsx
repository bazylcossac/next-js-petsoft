"use client";
import { usePetsContext } from "@/contexts/pets-context-provider";
import { useSearchContext } from "@/contexts/search-context-provider";
import { PetType } from "@/lib/types";
import { cn } from "@/lib/utils";
import FormDialog from "./form-dialog";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogClose, DialogContent, DialogHeader } from "./ui/dialog";

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
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="rounded-full absolute bottom-4 right-4"
          >
            <PlusIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-lg">Add new pet</DialogTitle>
            <DialogDescription>Add new pet you databse</DialogDescription>
          </DialogHeader>
          <FormDialog type="add" />
        </DialogContent>
      </Dialog>
    </ul>
  );
}

export default PetList;
