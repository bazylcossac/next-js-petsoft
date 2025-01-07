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
  DialogClose,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PetType } from "@/lib/types";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import FormDialog from "./form-dialog";

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
          <p className="text-xl md:text-2xl font-semibold overflow-auto max-w-[250px]">
            {selectedPetObject.name}
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          {/* <Button variant="secondary" className="rounded-3xl outline-none">
            Edit
          </Button> */}
          <EditDialog selectedPetObject={selectedPetObject} type="edit" />
          {/* <FormDialog type="edit" selectedPetObject={selectedPetObject} /> */}
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
            This action cannot be undone. This will delete pet from your
            account.
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

function EditDialog({
  selectedPetObject,
  type,
}: {
  selectedPetObject?: PetType;
  type: "add" | "edit";
}) {
  console.log(selectedPetObject);
  const { setPets, pets } = usePetsContext();
  const [petData, setPetData] = useState({
    id: selectedPetObject?.id,
    name: selectedPetObject?.name,
    age: selectedPetObject?.age,
    imageUrl: selectedPetObject?.imageUrl,
    ownerName: selectedPetObject?.ownerName,
    notes: selectedPetObject?.notes,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const { handleSubmit, register } = useForm();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event?.currentTarget);

    const newPet = {
      name: formData.get("name"),
    };

    const editedPet = { ...formData, id: selectedPetObject?.id };
    const otherPets = pets.filter((pet) => pet.id !== editedPet.id);

    setPets([...otherPets, formData]);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="rounded-3xl">
          {type === "add" ? "Add" : "Edit"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {selectedPetObject?.name} Info</DialogTitle>
          <DialogDescription>
            Make changes to pet here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-2"
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Pet Name
              </Label>
              <Input
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
              <Input
                {...register("age")}
                type="number"
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
              <Input
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
              <Input
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
              <Textarea
                {...register("notes")}
                id="notes"
                name="notes"
                value={petData.notes}
                className="col-span-3"
                onChange={handleChange}
                rows={3}
              />
            </div>
            <DialogClose>
              <Button type="submit" className="">
                Save changes
              </Button>
            </DialogClose>
          </form>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
