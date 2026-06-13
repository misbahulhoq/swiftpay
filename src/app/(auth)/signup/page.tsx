"use client";
import dynamic from "next/dynamic";
import { SignupForm as Signup } from "@/components/auth/signup-form";

const SignupForm = dynamic(() => Promise.resolve(Signup), {
  ssr: false,
});

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <SignupForm />
    </div>
  );
};

export default Page;
