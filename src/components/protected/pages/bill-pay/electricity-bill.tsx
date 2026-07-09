"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTransactions } from "@/hooks/use-transactions";

interface IPrepaidForm {
  meterNumber: string;
  amount: number;
}

interface IPostpaidForm {
  billNumber: string;
  amount: number;
}

const PrepaidForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPrepaidForm>();
  const { balanceOut } = useTransactions();

  const handlePayment = (data: IPrepaidForm) => {
    balanceOut("electricity-bill", data.amount);
    toast.success("Prepaid bill paid successfully");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handlePayment)}
      className="flex flex-col gap-3"
    >
      <div>
        <Input
          autoComplete="off"
          placeholder="Meter Number"
          className="h-11"
          {...register("meterNumber", {
            required: "Meter number is required",
            pattern: {
              value: /^\d{11}$/,
              message: "Meter number must be 11 digits",
            },
          })}
        />
        {errors.meterNumber && (
          <span className="text-destructive text-xs">
            {errors.meterNumber.message}
          </span>
        )}
      </div>

      <div>
        <Input
          placeholder="৳ Amount"
          type="number"
          className="h-11"
          {...register("amount", {
            required: "Amount is required",
            valueAsNumber: true,
            min: {
              value: 500,
              message: "Minimum amount is ৳500",
            },
          })}
        />
        {errors.amount && (
          <span className="text-destructive text-xs">
            {errors.amount.message}
          </span>
        )}
      </div>

      <Button type="submit" className="h-11 w-25 self-end rounded-full">
        Pay Bill
      </Button>
    </form>
  );
};

const PostpaidForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPostpaidForm>();
  const { balanceOut } = useTransactions();

  const handlePayment = (data: IPostpaidForm) => {
    balanceOut("electricity-bill", data.amount);
    toast.success("Postpaid bill paid successfully");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handlePayment)}
      className="flex flex-col gap-3"
    >
      <div>
        <Input
          autoComplete="off"
          placeholder="Bill Number"
          className="h-11"
          {...register("billNumber", {
            required: "Bill number is required",
            pattern: {
              value: /^\d{11}$/,
              message: "Bill number must be 11 digits",
            },
          })}
        />
        {errors.billNumber && (
          <span className="text-destructive text-xs">
            {errors.billNumber.message}
          </span>
        )}
      </div>

      <div>
        <Input
          placeholder="৳ Amount"
          type="number"
          className="h-11"
          {...register("amount", {
            required: "Amount is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Amount must be positive",
            },
          })}
        />
        {errors.amount && (
          <span className="text-destructive text-xs">
            {errors.amount.message}
          </span>
        )}
      </div>

      <Button type="submit" className="h-11 w-25 self-end rounded-full">
        Pay Bill
      </Button>
    </form>
  );
};

const ElectricityBill = () => {
  const [billType, setBillType] = useState<"prepaid" | "postpaid">("prepaid");

  return (
    <div>
      <div className="flex border-b">
        <div
          onClick={() => setBillType("prepaid")}
          className={cn(
            "w-1/2 cursor-pointer p-4 text-center",
            billType === "prepaid"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500",
          )}
        >
          Prepaid
        </div>

        <div
          onClick={() => setBillType("postpaid")}
          className={cn(
            "w-1/2 cursor-pointer p-4 text-center",
            billType === "postpaid"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500",
          )}
        >
          Postpaid
        </div>
      </div>

      <div className="p-4">
        {billType === "prepaid" ? <PrepaidForm /> : <PostpaidForm />}
      </div>
    </div>
  );
};

export default ElectricityBill;
