"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();
  const title = pathName.split("-").join(" ").replaceAll("/", "");

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 px-4 py-2">
      <div className="flex w-full items-center justify-between gap-5">
        <button
          onClick={() => {
            router.back();
          }}
          className="py-1 pr-2"
          title="Back"
        >
          <ArrowLeft />
        </button>

        <h3 className="capitalize">{title}</h3>

        <Image
          src="/swiftpay.webp"
          alt="Swiftpay Logo"
          width={24}
          height={24}
          className="rounded"
        />
      </div>
    </header>
  );
};

export default Header;
