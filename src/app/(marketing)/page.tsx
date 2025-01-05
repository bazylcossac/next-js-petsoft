"use clieny";
import Image from "next/image";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col lg:flex-row gap-10 items-center justify-center font-semibold px-4">
      <div>
        <Image
          src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
          alt="petsoft-preview"
          width={519}
          height={472}
        />
      </div>
      <div className="flex flex-col gap-6 max-w-[500px]">
        <Logo />
        <p className="text-5xl ">
          Manage your <span className="font-black">pet daycare </span>with ease
        </p>
        <p className="text-2xl">
          Use PetSoft to easly keep track of pets under your care. Get lifetime
          access for $299
        </p>

        <div className="flex flex-row font-medium gap-4">
          <Button asChild className="rounded-2xl">
            <Link href="/signup">Get started</Link>
          </Button>

          <Button asChild className="rounded-2xl" variant={"secondary"}>
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
