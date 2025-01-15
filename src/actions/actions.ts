"use server";

import { prisma } from "@/lib/db";

import { formSchema, IdSchema } from "@/lib/validations";

import { revalidatePath } from "next/cache";

export async function addPetToDb(pet: unknown) {
  const validatedPet = formSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Failed to valid data",
    };
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (err) {
    console.error(err);
    return {
      message: "Failed to add pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePetFromDb(petId: unknown) {
  const validateId = IdSchema.safeParse(petId);
  if (!validateId) {
    return {
      message: "Invalid id type",
    };
  }

  await prisma.pet.delete({
    where: {
      id: validateId.data,
    },
  });
  revalidatePath("/app", "layout");
}

export async function editPetInDb(updatedPet: unknown, selectedId: unknown) {
  const validatedPet = formSchema.safeParse(updatedPet);
  const validateId = IdSchema.safeParse(selectedId);

  if (!validateId.success || !validatedPet.success) {
    return {
      message: "Failed to valdiate data",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validateId.data,
      },
      data: validatedPet.data,
    });
  } catch (err) {
    console.error(err);
    return {
      message: "Failed to update pet",
    };
  }

  revalidatePath("/app", "layout");
}
