"use client";
import { usePetsContext } from "@/contexts/pets-context-provider";

function Stats() {
  const { pets } = usePetsContext();
  return (
    <section className="flex flex-col items-center ">
      <p className="font-bold text-2xl leading-6">{pets.length}</p>
      <p>current guests</p>
    </section>
  );
}

export default Stats;
