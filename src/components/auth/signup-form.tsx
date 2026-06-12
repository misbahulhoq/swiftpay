import { SubmitEventHandler } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
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

type SignupFormData = {
  fullName: string;
  phoneNumber: string;
  pin: string;
  confirmPin: string;
};

export function SignupForm() {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();
  const handleSignup: SubmitHandler<SignupFormData> = (data) => {
    console.log(data);
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
        <form className="grid gap-4" onSubmit={handleSubmit(handleSignup)}>
          <div className="grid gap-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              placeholder="e.g. Rahim Uddin"
              autoComplete="off"
              required
              className="h-11 rounded-md sm:h-9"
              {...register("fullName")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              autoComplete="off"
              placeholder="e.g. 01234567899"
              className="h-11 rounded-md sm:h-9"
              maxLength={11}
              {...register("phoneNumber", {
                required: "Phone number is required.",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed.",
                },
                validate: (value) =>
                  value.startsWith("0") || "Phone number must start with 0.",
                minLength: {
                  value: 11,
                  message: "Phone number must be 11 digits.",
                },
                maxLength: {
                  value: 11,
                  message: "Phone number must not exceed 11 digits.",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pin">Pin</Label>
            <Input
              autoComplete="off"
              id="pin"
              type="password"
              className="h-11 rounded-md sm:h-9"
              placeholder="5 digit pin"
              maxLength={5}
              {...register("pin", {
                required: "PIN is required.",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed.",
                },
                minLength: {
                  value: 5,
                  message: "PIN must be 5 digits.",
                },
                maxLength: {
                  value: 5,
                  message: "PIN must be 5 digits.",
                },
              })}
            />
            {errors.pin && (
              <p className="text-sm text-red-500">{errors.pin.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-pin">Confirm pin</Label>
            <Input
              autoComplete="off"
              id="confirm-pin"
              type="password"
              className="h-11 rounded-md sm:h-9"
              placeholder="Retype 5 digit pin"
              maxLength={5}
              {...register("confirmPin", {
                required: "Please confirm your PIN.",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed.",
                },
                minLength: {
                  value: 5,
                  message: "Confirm PIN must be 5 digits.",
                },
                maxLength: {
                  value: 5,
                  message: "Confirm PIN must be 5 digits.",
                },
                validate: (value) =>
                  value === watch("pin") || "The PINs do not match.",
              })}
            />
            {errors.confirmPin && (
              <p className="text-sm text-red-500">
                {errors.confirmPin.message}
              </p>
            )}
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
