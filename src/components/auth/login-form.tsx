"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
import { SubmitHandler, useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";

type LoginFormData = {
  phoneNumber: string;
  pin: string;
};

const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm<LoginFormData>();
  const [showPin, setShowPin] = useState(false);
  // eslint-disable-next-line react-hooks/incompatible-library
  const phoneNumberValue = watch("phoneNumber");
  const phoneErrorType = errors.phoneNumber?.type;

  const handleLogin: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const { phoneNumber, pin } = data;
      login(phoneNumber, pin);
      toast.success("Login successful", { position: "top-center" });
      router.push("/home");
    } catch (err) {
      toast.error((err as Error).message, { position: "top-center" });
    } finally {
      reset();
    }
  };

  useEffect(() => {
    if (
      phoneNumberValue &&
      phoneNumberValue.length > 0 &&
      !phoneNumberValue.startsWith("0")
    ) {
      setError("phoneNumber", {
        type: "manual",
        message: "Phone number must start with 0.",
      });
    } else {
      if (phoneErrorType === "manual") {
        clearErrors("phoneNumber");
      }
    }
  }, [phoneNumberValue, setError, clearErrors, phoneErrorType]);

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(handleLogin)}>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              maxLength={11}
              placeholder="e.g. 01234567899"
              autoFocus
              autoComplete="off"
              required
              className="h-11 rounded-md sm:h-9"
              {...register("phoneNumber", {
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
            <div className="relative">
              <Input
                id="pin"
                placeholder="Enter your pin"
                type={showPin ? "text" : "password"}
                maxLength={5}
                autoComplete="off"
                required
                className="h-11 rounded-md sm:h-9"
                {...register("pin", {
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Only numbers are allowed.",
                  },
                })}
              />

              <button
                type="button"
                aria-label={showPin ? "Hide PINs" : "Show PINs"}
                aria-pressed={showPin}
                className="absolute top-1/2 right-1 flex size-9 -translate-y-1/2 items-center justify-center rounded-md sm:size-7"
                onClick={() => setShowPin((value) => !value)}
              >
                {!showPin ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            {errors.pin && (
              <p className="text-sm text-red-500">{errors.pin.message}</p>
            )}
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
