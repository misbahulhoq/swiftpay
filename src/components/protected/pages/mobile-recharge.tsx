"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/use-transactions";

interface IForm {
  mobileNumber: string;
  amount: number;
}

const MobileRecharge = () => {
  const { balanceOut } = useTransactions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const handleRecharge = async (data: IForm) => {
    try {
      balanceOut("recharge", data.amount);
      toast.success("Recharge successful", {
        position: "bottom-center",
      });
      reset();
    } catch (_err) {
      toast.error((_err as Error).message || "Something went wrong", {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <h2 className="text-muted-foreground mb-3 text-lg">
        Enter mobile number and amount
      </h2>
      <form
        onSubmit={handleSubmit(handleRecharge)}
        className="flex flex-col gap-3"
      >
        <div>
          <Input
            autoComplete="off"
            placeholder="Mobile number"
            className="h-11"
            {...register("mobileNumber", {
              required: "Mobile number is required",
              pattern: {
                value: /^01[3-9]\d{8}$/,
                message: "Invalid Bangladeshi number format",
              },
            })}
          />
          {errors.mobileNumber && (
            <span className="text-destructive text-xs">
              {errors.mobileNumber.message}
            </span>
          )}
        </div>

        <div>
          <Input
            placeholder="৳ Amount"
            type="number"
            className="h-11"
            min={10}
            {...register("amount", {
              required: "Amount is required",
              valueAsNumber: true,
              min: {
                value: 10,
                message: "Minimum recharge amount is ৳10",
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
          Recharge
        </Button>
      </form>
    </div>
  );
};

export default MobileRecharge;
