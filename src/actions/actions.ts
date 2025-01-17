"use server";

import { signIn, signOut } from "@/app/auth";
import { prisma } from "@/lib/db";

import {
  emailSchema,
  formSchema,
  IdSchema,
  passwordSchema,
} from "@/lib/validations";
import bcrypt from "bcrypt";
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

export async function getUserFromDb(email: unknown, password: unknown) {
  const validatedEmail = emailSchema.safeParse(email);
  const validatePassword = passwordSchema.safeParse(password);

  if (!validatePassword.success || !validatedEmail.success) {
    return {
      message: "Invalid user data types",
    };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: validatedEmail.data,
      },
    });
    return user;
  } catch (err) {
    console.error(err);
    return {
      message: "Failed to fidn a user or user don't exist",
    };
  }
}

export async function createUser(email: unknown, password: unknown) {
  const validatedEmail = emailSchema.safeParse(email);
  const validatePassword = passwordSchema.safeParse(password);

  if (!validatePassword.success || !validatedEmail.success) {
    return {
      message: "Invalid user data types",
    };
  }
  try {
    await prisma.user.create({
      data: {
        email: validatedEmail.data,
        password: validatePassword.data,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      message: "Failed to create a user",
    };
  }
}

export async function logIn(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());
  await signIn("credentials", { ...authData, redirectTo: "/app/dashboard" });
}

export async function logOut() {
  await signOut({ redirectTo: "/login" });
}

export async function signUp(formData: FormData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");
  const hashPassword = await bcrypt.hash(password as string, 10);
  try {
    await prisma.user.create({
      data: {
        email: email as string,
        hashPassword: hashPassword,
      },
    });
    await logIn(formData);
  } catch (err) {
    console.error("Account already exists");
  }
}
