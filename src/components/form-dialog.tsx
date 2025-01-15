"use client";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { PetType } from "@/lib/types";
import { useForm } from "react-hook-form";
import { usePetsContext } from "@/contexts/pets-context-provider";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { flushSync } from "react-dom";
import { formSchema, formType } from "@/lib/validations";

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

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<formType>({ resolver: zodResolver(formSchema) });

  const handlePet = async () => {
    const result = await trigger();

    if (!result) {
      return;
    }

    flushSync(() => {
      onSubbmission();
    });

    const petData = getValues();
    petData.imageUrl =
      petData.imageUrl ||
      "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";

    if (type === "add") {
      await addNewPet(petData);
    } else {
      await addEditedPet(petData, selectedId!);
    }
  };

  return (
    <form
      action={handlePet}
      className=" flex flex-col justify-center space-y-4"
    >
      <div className="">
        <Label htmlFor="name" className="text-right">
          Pet Name
        </Label>
        <Input
          id="name"
          {...register("name")}
          className="col-span-3"
          defaultValue={type === "edit" ? selectedPetObject?.name : ""}
        />
        {errors.name && (
          <p className="text-red-500 font-bold text-xs">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="">
        <Label htmlFor="age" className="text-right">
          Age
        </Label>
        <Input
          type="number"
          id="age"
          className="col-span-3"
          {...register("age")}
          defaultValue={type === "edit" ? selectedPetObject?.age : ""}
        />
        {errors.age && (
          <p className="text-red-500 font-bold text-xs ">
            {errors.age.message}
          </p>
        )}
      </div>
      <div className="">
        <Label htmlFor="image" className="text-right">
          Image
        </Label>
        <Input
          id="image"
          {...register("imageUrl")}
          className="col-span-3"
          defaultValue={type === "edit" ? selectedPetObject?.imageUrl : ""}
        />
        {errors.imageUrl && (
          <p className="text-red-500 font-bold text-xs -m-4">
            {errors.imageUrl.message}
          </p>
        )}
      </div>
      <div className="">
        <Label htmlFor="ownerName" className="text-right">
          Owner
        </Label>
        <Input
          id="ownerName"
          {...register("ownerName")}
          className="col-span-3"
          defaultValue={type === "edit" ? selectedPetObject?.ownerName : ""}
        />
        {errors.ownerName && (
          <p className="text-red-500 font-bold text-xs">
            {errors.ownerName.message}
          </p>
        )}
      </div>
      <div className="">
        <Label htmlFor="notes" className="text-right">
          Notes
        </Label>
        <Textarea
          id="notes"
          {...register("notes")}
          className="col-span-3"
          rows={3}
          defaultValue={type === "edit" ? selectedPetObject?.notes : ""}
        />
        {errors.notes && (
          <p className="text-red-500 font-bold text-xs -m-4">
            {errors.notes.message}
          </p>
        )}
      </div>
      <div className=" flex justify-end pt-2">
        <Button type="submit" className="w-[150px]">
          <p>{type === "add" ? "Add pet" : "Save changes"}</p>
        </Button>
      </div>
    </form>
  );
}

export default FormDialog;
