"use client";

import { useForm } from "react-hook-form";
import { LogOut, User } from "lucide-react";
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
import { updateProfile, useProfile } from "@/hooks/use-profile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ProfileSchema = {
  name?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

const Profile = () => {
  const router = useRouter();
  const profile = useProfile();
  const { handleSubmit, formState, register, setError, watch } =
    useForm<ProfileSchema>({
      defaultValues: {
        name: profile?.name || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    });

  const infoChanged =
    watch("name") !== profile?.name || watch("currentPassword") !== "";

  const onSubmit = (values: ProfileSchema) => {
    console.log(values);
    const isChangingPassword =
      values.currentPassword ||
      values.currentPassword ||
      values.confirmPassword;

    if (isChangingPassword) {
      if (values.currentPassword !== profile?.password) {
        setError("currentPassword", {
          message: "Current password is incorrect.",
        });
        return;
      }
      if (values.newPassword !== values.confirmPassword) {
        setError("confirmPassword", {
          message: "Passwords don't match",
        });
        return;
      }
      if (values.newPassword === values.currentPassword) {
        setError("newPassword", {
          message: "New password must be different from the current password.",
        });
        return;
      }
      updateProfile(values);
    } else {
      updateProfile({ name: values.name });
    }
    toast.success("Profile updated successfully", { position: "top-center" });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("swiftpay_user");
    router.push("/login");
  };

  return (
    <div className="space-y-8 p-4 pb-16">
      <div className="flex items-center space-x-4">
        <User className="text-primary h-10 w-10" />
        <div>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">
            Update your name and password.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Update Information</CardTitle>
          <CardDescription>Make sure to use a strong password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                defaultValue={profile?.phoneNumber}
                readOnly
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", {
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
              {formState.errors.name && (
                <p className="text-sm text-red-500">
                  {formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                {...register("currentPassword")}
              />
              {formState.errors.currentPassword && (
                <p className="text-sm text-red-500">
                  {formState.errors.currentPassword.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                {...register("newPassword", {
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
              {formState.errors.newPassword && (
                <p className="text-sm text-red-500">
                  {formState.errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                {...register("confirmPassword", {
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
              {formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={!infoChanged}>
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      <Button variant="destructive" className="" onClick={handleLogout}>
        <LogOut />
        Logout
      </Button>
    </div>
  );
};

export default Profile;
