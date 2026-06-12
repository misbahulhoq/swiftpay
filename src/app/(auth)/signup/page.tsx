import React from "react";
import { SignupForm } from "@/components/auth/signup-screen";

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <SignupForm />
    </div>
  );
};

export default Page;
