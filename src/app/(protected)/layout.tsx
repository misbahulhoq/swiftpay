"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BottomNav from "@/components/protected/bottom-nav";

type ProtectedLayoutProps = {
  children: React.ReactNode;
  params: Promise<Record<string, never>>;
};

const Layout = ({ children }: ProtectedLayoutProps) => {
  const [user, setUser] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUser = sessionStorage.getItem("swiftpay_user");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(currentUser);
    setMounted(true);

    if (!currentUser) {
      router.replace("/login");
    }
  }, [router]);

  if (!mounted || !user) {
    return null;
  }

  return (
    <div>
      {children}
      <BottomNav />
    </div>
  );
};

export default Layout;
