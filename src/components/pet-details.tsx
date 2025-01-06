"use client";
import { usePetsContext } from "@/contexts/pets-context-provider";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PetType } from "@/lib/types";

function PetDetails() {
  const { selectedPetObject, checkoutPet } = usePetsContext();
  if (!selectedPetObject) {
    return (
      <div className="w-full h-full flex items-center justify-center text-2xl text-black/30">
        No pet selected...
      </div>
    ); /// replace with skeleton
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
            className="w-[45px] h-[45px] md:w-[75px] md:h-[75px] rounded-full object-cover"
          />
          <p className="text-xl md:text-2xl  font-semibold">
            {selectedPetObject.name}
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          {/* <Button variant="secondary" className="rounded-3xl outline-none">
            Edit
          </Button> */}
          <EditDialog selectedPetObject={selectedPetObject} />
          <CheckOutDialog
            selectedPetObject={selectedPetObject}
            checkoutPet={checkoutPet}
          />
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

function CheckOutDialog({ checkoutPet, selectedPetObject }) {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="rounded-3xl bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90 px-3 py-2">
          Checkout
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Do you want to checkout{" "}
            <span className="font-bold">{selectedPetObject.name}?</span>
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete pet from
            your account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button
            variant="destructive"
            className="rounded-3xl w-[100px]"
            onClick={() => {
              checkoutPet(selectedPetObject.id);
            }}
          >
            Chceckout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EditDialog({ selectedPetObject }: { selectedPetObject: PetType }) {
  console.log(selectedPetObject);
  const { setPets, pets } = usePetsContext();
  const [petData, setPetData] = useState<PetType>({
    id: selectedPetObject.id,
    name: selectedPetObject.name,
    age: selectedPetObject.age,
    imageUrl: selectedPetObject.imageUrl,
    ownerName: selectedPetObject.ownerName,
    notes: selectedPetObject.notes,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const { handleSubmit, register } = useForm();
  const onSubmit = (formData) => {
    const editedPet = { ...formData, id: selectedPetObject.id };
    const otherPets = pets.filter((pet) => pet.id !== editedPet.id);

    setPets([...otherPets, formData]);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="rounded-3xl">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Pet Info</DialogTitle>
          <DialogDescription>
            Make changes to pet here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Pet Name
              </Label>
              <input
                {...register("name")}
                id="name"
                name="name"
                value={petData.name}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                Age
              </Label>
              <input
                {...register("age")}
                id="age"
                name="age"
                value={petData.age}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <input
                {...register("imageUrl")}
                id="image"
                name="image"
                value={petData.imageUrl}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="owner" className="text-right">
                Owner
              </Label>
              <input
                {...register("ownerName")}
                id="ownerName"
                name="ownerName"
                value={petData.ownerName}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <textarea
                {...register("notes")}
                id="notes"
                name="notes"
                value={petData.notes}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <Button type="submit">Save changes</Button>
          </form>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
