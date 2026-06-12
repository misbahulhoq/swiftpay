import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="e.g. 01234567899"
              autoFocus
              autoComplete="off"
              required
              className="h-11 rounded-md sm:h-9"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pin">Pin</Label>
            <Input
              id="pin"
              name="pin"
              type="text"
              autoComplete="off"
              required
              className="h-11 rounded-md sm:h-9"
            />
          </div>
          <Button type="submit" className="mt-4 h-11 w-full">
            Login
          </Button>
        </form>

        <div className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="ml-1 pl-1 underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
