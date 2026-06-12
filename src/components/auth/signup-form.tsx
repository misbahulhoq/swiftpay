import { SubmitEventHandler } from "react";
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
import { useAuth } from "@/hooks/use-auth";

export function SignupForm() {
  const { signup } = useAuth();

  const handleSignup: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const name = e.target["full-name"].value;
    const phoneNumber = e.target.phone.value;
    const pin = e.target.pin.value;
    console.log({ name, phoneNumber, pin });
    // signup(name, phoneNumber, pin);
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="grid gap-4" onSubmit={handleSignup}>
          <div className="grid gap-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              placeholder="e.g. Rahim Uddin"
              autoComplete="off"
              required
              className="h-11 rounded-md sm:h-9"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              autoComplete="off"
              placeholder="e.g. 01234567899"
              required
              className="h-11 rounded-md sm:h-9"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pin">Pin</Label>
            <Input
              autoComplete="off"
              id="pin"
              type="pin"
              className="h-11 rounded-md sm:h-9"
              placeholder="5 digit pin"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-pin">Confirm pin</Label>
            <Input
              autoComplete="off"
              id="confirm-pin"
              type="pin"
              className="h-11 rounded-md sm:h-9"
              placeholder="Retype 5 digit pin"
            />
          </div>
          <Button type="submit" className="mt-4 h-11 w-full">
            Create an account
          </Button>
        </form>

        <div className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="ml-1 pl-1 underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
