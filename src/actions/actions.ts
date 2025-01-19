"use server";

import { auth, signIn, signOut } from "@/app/auth";
import { prisma } from "@/lib/db";

import {
  emailSchema,
  formSchema,
  IdSchema,
  authSchema,
  passwordSchema,
} from "@/lib/validations";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addPetToDb(pet: unknown) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const validatedPet = formSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Failed to valid data",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
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
  const session = await auth();
  const validateId = IdSchema.safeParse(petId);
  if (!session?.user) {
    redirect("/login");
  }
  if (!validateId) {
    return {
      message: "Invalid id type",
    };
  }

  const pet = await prisma.pet.findUnique({
    where: {
      id: validateId.data,
    },
    select: {
      userId: true,
    },
  });

  if (!pet) {
    return {
      message: "Failed to find a pet",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized",
    };
  }
  await prisma.pet.delete({
    where: {
      id: validateId.data,
      userId: session.user.id,
    },
  });
  revalidatePath("/app", "layout");
}

export async function editPetInDb(updatedPet: unknown, selectedId: unknown) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const validatedPet = formSchema.safeParse(updatedPet);
  const validateId = IdSchema.safeParse(selectedId);

  if (!validateId.success || !validatedPet.success) {
    return {
      message: "Failed to valdiate data",
    };
  }

  const pet = await prisma.pet.findUnique({
    where: {
      id: validateId.data,
    },
  });

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized",
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

export async function logIn(formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  const formDataObject = Object.fromEntries(formData.entries());
  const validateFormData = authSchema.safeParse(formDataObject);

  if (!validateFormData.success) {
    return {
      message: "Invalid credentials",
    };
  }

  try {
    await signIn("credentials", {
      ...validateFormData.data,
      redirectTo: "/app/dashboard",
    });
  } catch (err) {
    return {
      message: "Account do not exists",
    };
  }
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
    return {
      message: "Account already exists",
    };
  }
}
