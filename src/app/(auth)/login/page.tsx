"use client";
import dynamic from "next/dynamic";
import Login from "@/components/auth/login-form";

const LoginForm = dynamic(() => Promise.resolve(Login), {
  ssr: false,
});

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <LoginForm />
    </div>
  );
};

export default Page;
