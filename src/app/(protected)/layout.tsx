"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  if (!mounted || !user) {
    return null;
  }

  return <div>{children}</div>;
};

export default dynamic(() => Promise.resolve(Layout), {
  ssr: false,
});
