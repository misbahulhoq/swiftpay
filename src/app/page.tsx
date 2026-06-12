"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  if (!user) {
    router.push("/login");
    return null;
  }
  return <div className=""></div>;
}
