"use server";

import { prisma } from "@/lib/db";
import { PetType } from "@/lib/types";
import { sleep } from "@/utils/sleep";

import { revalidatePath } from "next/cache";

export async function addPetToDb(pet: Omit<PetType, "id">) {
  await sleep(2000);
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
  await sleep(2000);
  try {
    await prisma.pet.update({
      where: {
        id: selectedId,
      },
      data: updatedPet,
    });
  } catch (err) {
    return {
      message: "Failed to update pet",
    };
  }

  revalidatePath("/app", "layout");
}
