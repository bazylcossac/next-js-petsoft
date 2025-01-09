"use server";

import { prisma } from "@/lib/db";

import { revalidatePath } from "next/cache";

export async function addPetToDb(formData: FormData) {
  await prisma.pet.create({
    data: {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      age: +(formData.get("age") as string),
      imageUrl:
        (formData.get("image") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      notes: formData.get("notes") as string,
    },
  });
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

export async function editPetInDb(formData: FormData, selectedId: string) {
  const editedData = {
    name: formData.get("name") as string,
    ownerName: formData.get("ownerName") as string,
    age: +(formData.get("age") as string),
    imageUrl:
      (formData.get("image") as string) ||
      "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
    notes: formData.get("notes") as string,
  };

  await prisma.pet.upsert({
    where: {
      id: selectedId,
    },
    update: editedData,
    create: editedData,
  });

  revalidatePath("/app", "layout");
}
