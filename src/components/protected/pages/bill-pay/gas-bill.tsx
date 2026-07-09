"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MonthPicker } from "@/components/ui/month-picker";

interface IForm {
  billingNumber: string;
  amount: number;
  month: string;
}

const GasBill = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IForm>();

  useEffect(() => {
    if (date) {
      setValue("month", format(date, "MMM yyyy"));
    }
  }, [date, setValue]);

  const handlePayment = (data: IForm) => {
    console.log(data);
    toast.success("Gas bill paid successfully");
    reset();
    setDate(new Date());
  };

  return (
    <div>
      <h2 className="text-muted-foreground mb-3 text-lg">
        Enter bill number, amount and month
      </h2>
      <form
        onSubmit={handleSubmit(handlePayment)}
        className="flex flex-col gap-3"
      >
        <div>
          <Input
            autoComplete="off"
            placeholder="Billing Number"
            className="h-11"
            {...register("billingNumber", {
              required: "Billing number is required",
              minLength: {
                value: 11,
                message: "Billing number must be at least 11 digits",
              },
            })}
          />
          {errors.billingNumber && (
            <span className="text-destructive text-xs">
              {errors.billingNumber.message}
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

        <div>
          <MonthPicker date={date} setDate={setDate} />
          <input
            type="hidden"
            {...register("month", {
              required: "Month is required",
            })}
          />
          {errors.month && (
            <span className="text-destructive text-xs">
              {errors.month.message}
            </span>
          )}
        </div>

        <Button type="submit" className="h-11 w-25 self-end rounded-full">
          Pay Bill
        </Button>
      </form>
    </div>
  );
};

export default GasBill;