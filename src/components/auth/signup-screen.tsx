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

export function SignupForm() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              placeholder="e.g. Rahim Uddin"
              required
              className="h-11 rounded-md sm:h-9"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="phone"
              placeholder="e.g. 01234567899"
              required
              className="h-11 rounded-md sm:h-9"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pin">Pin</Label>
            <Input
              id="pin"
              type="pin"
              className="h-11 rounded-md sm:h-9"
              placeholder="5 digit pin"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-pin">Confirm pin</Label>
            <Input
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
