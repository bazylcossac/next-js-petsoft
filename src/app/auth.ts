import { prisma } from "@/lib/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLogged = !!auth?.user;
      const isTryingToAccess = request.nextUrl.pathname.includes("/app");
      const isTryingToAccessLogIn = request.nextUrl.pathname.includes("/login");

      if (!isLogged && isTryingToAccess) {
        return false;
      }
      if (isLogged && isTryingToAccess) {
        return true;
      }
      if (isLogged && !isTryingToAccess) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }
      if (!isLogged && !isTryingToAccess) return true;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        console.log(user);
        if (!user) {
          throw new Error("Invalid credentials.");
        }
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.hashPassword
        );
        if (!isMatch) {
          console.log("Invalid credentials.");
        }
        return user;
      },
    }),
  ],
});
