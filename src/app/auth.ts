import { prisma } from "@/lib/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLogged = !!auth?.user;
      const isTryingToAccess = request.nextUrl.pathname.includes("/app");

      if (!isLogged && isTryingToAccess) {
        return false;
      } else if (isLogged && isTryingToAccess) {
        return true;
      }
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
