"use client";
import { usePetsContext } from "@/contexts/pets-context-provider";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { Button } from "./ui/button";

import FormDialog from "./form-dialog";
import { PetType } from "@/lib/types";

function PetDetails() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { selectedPetObject, checkoutPet } = usePetsContext();
  if (!selectedPetObject) {
    return (
      <div className="w-full h-full flex items-center justify-center text-2xl text-black/30">
        No pet selected...
      </div>
    );
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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="rounded-3xl">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-bold text-lg">
                  Edit {selectedPetObject.name} data
                </DialogTitle>
              </DialogHeader>
              <FormDialog
                type="edit"
                selectedPetObject={selectedPetObject}
                onSubbmission={() => setDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

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

function CheckOutDialog({
  checkoutPet,
  selectedPetObject,
}: {
  checkoutPet: (id: string) => void;
  selectedPetObject: PetType;
}) {
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
