import { prisma } from "@/lib/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authSchema } from "@/lib/validations";

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
      }
      if (isLogged && isTryingToAccess) {
        return true;
      }
      if (isLogged && !isTryingToAccess) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }
      if (!isLogged && !isTryingToAccess) return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validateCredentials = authSchema.safeParse(credentials);

        if (!validateCredentials.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: validateCredentials.data.email,
          },
        });
        console.log(user);
        if (!user) {
          throw new Error("Invalid credentials.");
        }
        const isMatch = await bcrypt.compare(
          validateCredentials.data.password,
          user.hashPassword
        );
        if (!isMatch) {
          console.log("Invalid credentials.");
          return null;
        }
        return user;
      },
    }),
  ],
});
