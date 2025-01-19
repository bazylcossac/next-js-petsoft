import { z } from "zod";

export const IdSchema = z.string().uuid();

export const emailSchema = z
  .string({ required_error: "Email is required" })
  .min(1, "Email is required")
  .email("Invalid email");

export const passwordSchema = z
  .string({ required_error: "Password is required" })
  .min(1, "Password is required")

  .max(32, "Password must be less than 32 characters");

export const authSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .max(32, "Password must be less than 32 characters"),
});

export type TAuth = z.infer<typeof authSchema>;

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Provide a real name" })
      .max(50, { message: "Name should be less than 50 characters" })
      .nonempty("Please provide name")
      .trim(),
    age: z.coerce.number().int().positive().max(99999),
    ownerName: z
      .string()
      .max(50, "Owner name should be less than 50 characters")
      .nonempty("Please provide owner name")
      .trim(),
    imageUrl: z.union([
      z.literal(""),
      z.string().url({ message: "Image url must be a valid url" }).trim(),
    ]),
    notes: z.union([
      z.literal(""),
      z.string().max(1000, "Too many characters!").trim(),
    ]),
  })
  .transform((data) => ({
    ...data,
    imageUrl:
      data.imageUrl ||
      "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
  }));
export type formType = z.infer<typeof formSchema>;
