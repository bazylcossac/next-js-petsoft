"use server";

import { prisma } from "@/lib/db";
import { PetType } from "@/lib/types";

import { revalidatePath } from "next/cache";

export async function addPetToDb(pet: Omit<PetType, "id">) {
  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (err) {
    return {
      message: "Failed to add pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePetFromDb(petId: string) {
  await prisma.pet.delete({
    where: {
      id: petId,
    },
  });
  revalidatePath("/app", "layout");
}

export async function editPetInDb(
  updatedPet: Omit<PetType, "id">,
  selectedId: string
) {
  try {
    await prisma.pet.update({
      where: {
        id: selectedId,
      },
      data: updatedPet,
    });
  } catch (error) {
    return {
      message: "Failed to update pet",
    };
  }

  revalidatePath("/app", "layout");
}
