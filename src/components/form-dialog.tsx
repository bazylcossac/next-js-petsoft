import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";

import React from "react";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { PetType } from "@/lib/types";

import { usePetsContext } from "@/contexts/pets-context-provider";
import { Input } from "./ui/input";

type FormDialogTypes = {
  type: "edit" | "add";
  selectedPetObject?: PetType;
};

function FormDialog({ type, selectedPetObject }: FormDialogTypes) {
  console.log(selectedPetObject);
  const { setPets, pets, addNewPet } = usePetsContext();

  const handleAddPet = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event?.currentTarget);

    const newPet = {
      name: formData.get("name"),
      ownerName: formData.get("owner"),
      age: formData.get("age"),
      imageUrl:
        formData.get("image") ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      notes: formData.get("notes"),
    };

    addNewPet(newPet);
  };

  const handleEditPet = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={type === "add" ? handleAddPet : handleEditPet}
      className=" flex flex-col justify-center space-y-2"
    >
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Pet Name
        </Label>
        <Input id="name" name="name" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="age" className="text-right">
          Age
        </Label>
        <Input type="number" id="age" name="age" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="image" className="text-right">
          Image
        </Label>
        <Input id="image" name="image" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="owner" className="text-right">
          Owner
        </Label>
        <Input id="ownerName" name="ownerName" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="notes" className="text-right">
          Notes
        </Label>
        <Textarea id="notes" name="notes" className="col-span-3" rows={3} />
      </div>
      <Button type="submit" className="">
        Add pet
      </Button>
    </form>
  );
}

export default FormDialog;
