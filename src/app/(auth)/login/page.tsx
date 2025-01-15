import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col ">
      <H1 className="my-4 text-center">Log In</H1>
      <AuthForm type="login" />
      <span className="mt-2">
        No account yet?{" "}
        <Link className="font-semibold" href="/signup">
          {" "}
          Sign in
        </Link>
      </span>
    </div>
  );
}

export default Page;
