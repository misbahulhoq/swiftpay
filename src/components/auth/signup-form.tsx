import { useEffect, useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

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
import { toast } from "sonner";

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
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<SignupFormData>();
  const handleSignup: SubmitHandler<SignupFormData> = async (data) => {
    try {
      signup(data.fullName, data.phoneNumber, data.pin);
      toast.success("Account created successfully, please login", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message, { position: "top-center" });
    } finally {
      reset();
    }
  };

  const [isPhoneReadOnly, setIsPhoneReadOnly] = useState(true);
  const [showPins, setShowPins] = useState(false);
  const phoneNumberValue = watch("phoneNumber");
  const phoneErrorType = errors.phoneNumber?.type;

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
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="grid gap-4"
          autoComplete="off"
          onSubmit={handleSubmit(handleSignup)}
        >
          <div className="grid gap-2">
            <Label htmlFor="signup-entry-alpha">Full Name</Label>
            <Controller
              name="fullName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  id="signup-entry-alpha"
                  name="signup-entry-alpha"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  placeholder="e.g. Rahim Uddin"
                  autoComplete="section-signup-alpha new-password"
                  autoCorrect="off"
                  spellCheck={false}
                  required
                  className="h-11 rounded-md sm:h-9"
                />
              )}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="signup-entry-beta">Phone</Label>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "Phone number is required.",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed.",
                },
                minLength: {
                  value: 11,
                  message: "Phone number must be 11 digits.",
                },
                maxLength: {
                  value: 11,
                  message: "Phone number must not exceed 11 digits.",
                },
              }}
              render={({ field }) => (
                <Input
                  id="signup-entry-beta"
                  name="signup-entry-beta"
                  type="tel"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  autoComplete="section-signup-beta new-password"
                  inputMode="numeric"
                  placeholder="e.g. 01234567899"
                  className="h-11 rounded-md sm:h-9"
                  maxLength={11}
                  readOnly={isPhoneReadOnly}
                  onFocus={() => setIsPhoneReadOnly(false)}
                />
              )}
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
                autoComplete="new-password"
                id="pin"
                type={showPins ? "text" : "password"}
                inputMode="numeric"
                className="h-11 rounded-md pr-11 sm:h-9"
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
              <button
                type="button"
                aria-label={showPins ? "Hide PINs" : "Show PINs"}
                aria-pressed={showPins}
                className="absolute top-1/2 right-1 size-9 -translate-y-1/2 rounded-md sm:size-7"
                onClick={() => setShowPins((value) => !value)}
              >
                {!showPins ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            {errors.pin && (
              <p className="text-sm text-red-500">{errors.pin.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-pin">Confirm pin</Label>
            <div className="relative">
              <Input
                autoComplete="new-password"
                id="confirm-pin"
                type={showPins ? "text" : "password"}
                inputMode="numeric"
                className="h-11 rounded-md pr-11 sm:h-9"
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
              <button
                type="button"
                aria-label={showPins ? "Hide PINs" : "Show PINs"}
                aria-pressed={showPins}
                className="absolute top-1/2 right-1 size-9 -translate-y-1/2 rounded-md sm:size-7"
                onClick={() => setShowPins((value) => !value)}
              >
                {!showPins ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
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
