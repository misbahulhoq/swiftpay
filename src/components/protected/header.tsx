"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();
  const title = pathName.split("-").join(" ").replaceAll("/", "");

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 px-5 py-2">
      <div className="flex w-full items-center gap-5">
        <button
          onClick={() => {
            router.back();
          }}
          className="p-2"
        >
          <ArrowLeft />
        </button>

        <h3 className="justify-self-center text-center capitalize">{title}</h3>
      </div>
    </header>
  );
};

export default Header;
