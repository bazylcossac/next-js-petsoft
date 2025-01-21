"use client";
import { createCheckoutSession } from "@/actions/actions";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";

import React, { useTransition } from "react";

function Page() {
  const params = useSearchParams();
  const search = params.get("success");
  const { update } = useSession();
  const [isPendingCheckout, startTransitionCheckout] = useTransition();
  const [isPendingRedirect, startTransitionRedirect] = useTransition();

  return (
    <div className="flex items-center flex-col gap-10">
      <H1>PetSoft access requires payment</H1>
      {search !== "true" && (
        <Button
          disabled={isPendingCheckout}
          onClick={async () => {
            startTransitionCheckout(async () => {
              await createCheckoutSession();
            });
          }}
        >
          Gain access for 299$
        </Button>
      )}
      {search === "true" && (
        <>
          <p className="text-green-600 ">
            Payment successful! You now have access to PetSoft
          </p>
          <Button
            disabled={isPendingRedirect}
            onClick={async () => {
              startTransitionRedirect(async () => {
                await update(true);
                redirect("/app/dashboard");
              });
            }}
          >
            Go to PetSoft
          </Button>
        </>
      )}
      {search === "false" && (
        <>
          <p className="text-red-500 ">Payment failed! Please try again!</p>
        </>
      )}
    </div>
  );
}

export default Page;
