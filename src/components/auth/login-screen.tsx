import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginScreen = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold text-gray-900">Login</h1>

        <form className="space-y-7">
          <div>
            <Label htmlFor="phone" className="">
              Phone Number
            </Label>
            <div className="mt-2">
              <Input
                id="phone"
                name="phone"
                placeholder=""
                autoComplete="off"
                required
                className="rounded-md"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="password" className="">
              Password
            </Label>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                required
                className="rounded-md"
              />
            </div>
          </div>
          <div>
            <Button className="h-10 w-full">Login</Button>
          </div>
        </form>

        <footer className="flex items-center justify-between">
          <h2>Don&apos;t have an account?</h2>
          <Link href="/signup" className="underline">
            Signup
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default LoginScreen;
