import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col ">
      <H1 className="my-4 text-center">Sign Up</H1>
      <AuthForm type="signin" />
      <span className="mt-2">
        Have an account?{" "}
        <Link className="font-semibold" href="/login">
          {" "}
          Log In
        </Link>
      </span>
    </div>
  );
}

export default Page;
