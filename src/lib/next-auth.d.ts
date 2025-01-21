import {} from "next-auth";
declare module "auth/core/jwt" {
  interface JWT {
    userId: string;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    hasAccess: boolean;
  }
  interface Session {
    user: User & {
      id: string;
    };
  }
}
