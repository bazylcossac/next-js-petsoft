"use client";
import { usePetsContext } from "@/contexts/pets-context-provider";
import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";

function PetDetails() {
  const { selectedPetObject } = usePetsContext();
  if (!selectedPetObject) {
    return <p>Loading...</p>; /// replace with skeleton
  }

  return (
    <section className="flex flex-col p-6 w-full h-full">
      <div className="flex flex-row items-center  justify-between w-full">
        <div className="flex items-center justify-between gap-4">
          <Image
            src={selectedPetObject.imageUrl}
            alt={`${selectedPetObject.name} image`}
            width={75}
            height={75}
            className="w-[75px] h-[75px] rounded-full object-cover"
          />
          <p className="text-2xl  font-semibold">{selectedPetObject.name}</p>
        </div>
        <div className="space-x-6 ">
          <Button variant="secondary" className="rounded-3xl">
            Edit
          </Button>
          <Button variant="destructive" className="rounded-3xl">
            Checkout
          </Button>
        </div>
      </div>

      <div>
        <div className="flex flex-row justify-around my-10 text-center">
          <div className="leading-6">
            <p>OWNER NAME</p>
            <p className="text-lg">{selectedPetObject.ownerName}</p>
          </div>
          <div>
            <p>AGE</p>
            <p className="text-lg ">{selectedPetObject.age}</p>
          </div>
        </div>
        <section className=" flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8">
          <p className="ml-6">{selectedPetObject.notes}</p>
        </section>
      </div>
    </section>
  );
}

export default PetDetails;
