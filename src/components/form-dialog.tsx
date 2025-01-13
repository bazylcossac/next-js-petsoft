import { Label } from "@radix-ui/react-label";
import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { PetType } from "@/lib/types";

import { usePetsContext } from "@/contexts/pets-context-provider";
import { Input } from "./ui/input";

import { flushSync, useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

type FormDialogTypes = {
  type: "edit" | "add";
  selectedPetObject?: PetType;
  onSubbmission: () => void;
};

function FormDialog({
  type,
  selectedPetObject,
  onSubbmission,
}: FormDialogTypes) {
  const { addNewPet, addEditedPet, selectedId } = usePetsContext();

  const handlePet = async (formData: FormData) => {
    flushSync(() => {
      onSubbmission();
    });
    const petData = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      age: +(formData.get("age") as string),
      imageUrl:
        (formData.get("image") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      notes: formData.get("notes") as string,
    };

    if (type === "add") {
      await addNewPet(petData);
    } else {
      await addEditedPet(petData, selectedId!);
    }
  };

  return (
    <form
      action={handlePet}
      className=" flex flex-col justify-center space-y-2"
    >
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Pet Name
        </Label>
        <Input
          id="name"
          name="name"
          className="col-span-3"
          required
          defaultValue={type === "edit" ? selectedPetObject?.name : ""}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="age" className="text-right">
          Age
        </Label>
        <Input
          type="number"
          id="age"
          name="age"
          className="col-span-3"
          required
          defaultValue={type === "edit" ? selectedPetObject?.age : ""}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="image" className="text-right">
          Image
        </Label>
        <Input
          id="image"
          name="image"
          className="col-span-3"
          defaultValue={type === "edit" ? selectedPetObject?.imageUrl : ""}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="ownerName" className="text-right">
          Owner
        </Label>
        <Input
          id="ownerName"
          name="ownerName"
          className="col-span-3"
          required
          defaultValue={type === "edit" ? selectedPetObject?.ownerName : ""}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="notes" className="text-right">
          Notes
        </Label>
        <Textarea
          id="notes"
          name="notes"
          className="col-span-3"
          rows={3}
          required
          defaultValue={type === "edit" ? selectedPetObject?.notes : ""}
        />
      </div>
      <div className=" flex justify-end pt-2">
        <SubmitButton type={type} />
      </div>
    </form>
  );
}

function SubmitButton(type: "edit" | "add") {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-[150px]" disabled={pending}>
      <p
        className={cn({
          hidden: pending,
        })}
      >
        {type === "add" ? "Add pet" : "Save changes"}
      </p>
      {pending && <p className="animate-pulse">Saving...</p>}
    </Button>
  );
}

export default FormDialog;
