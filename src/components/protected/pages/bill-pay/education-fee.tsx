"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MonthPicker } from "@/components/protected/month-picker";
import { useTransactions } from "@/hooks/use-transactions";

interface IForm {
  studentId: string;
  amount: number;
  month: string;
}

const EducationFee = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { balanceOut } = useTransactions();
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

  const handlePayment = async (data: IForm) => {
    try {
      balanceOut("education-fee", data.amount);
      toast.success("Education fee paid successfully");
      reset();
      setDate(new Date());
    } catch (err) {
      toast.error((err as Error).message || "Something went wrong", {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <h2 className="text-muted-foreground mb-3 text-lg">
        Enter student ID, amount and month
      </h2>
      <form
        onSubmit={handleSubmit(handlePayment)}
        className="flex flex-col gap-3"
      >
        <div>
          <Input
            autoComplete="off"
            placeholder="Student ID"
            className="h-11"
            {...register("studentId", {
              required: "Student ID is required",
              minLength: {
                value: 4,
                message: "Student ID must be at least 4 characters",
              },
            })}
          />
          {errors.studentId && (
            <span className="text-destructive text-xs">
              {errors.studentId.message}
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

export default EducationFee;