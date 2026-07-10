"use client";

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
import { User } from "lucide-react";
import { useProfile } from "@/hooks/use-profile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required." }),
    newPassword: z
      .string()
      .min(5, { message: "New password must be at least 5 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Profile = () => {
  const profile = useProfile();
  const { handleSubmit, formState, register, setError } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile?.name || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
              <Input id="name" {...register("name")} />
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
                {...register("newPassword")}
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
                {...register("confirmPassword")}
              />
              {formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
