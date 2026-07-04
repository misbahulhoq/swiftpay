"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/use-transactions";

interface IForm {
  agentNumber: string;
  amount: number;
}

const CashOut = () => {
  const { balanceOut } = useTransactions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const handleCashOut = async (data: IForm) => {
    try {
      balanceOut("cash-out", data.amount);
      toast.success("Cash out successful", {
        position: "bottom-center",
      });
    } catch (_err) {
      toast.error((_err as Error).message || "Something went wrong", {
        position: "top-center",
      });
    } finally {
      reset();
    }
  };

  return (
    <div>
      <h2 className="text-muted-foreground mb-3 text-lg">
        Enter agent number and amount
      </h2>
      <form
        onSubmit={handleSubmit(handleCashOut)}
        className="flex flex-col gap-3"
      >
        <div>
          <Input
            autoComplete="off"
            placeholder="Agent's number"
            className="h-11"
            {...register("agentNumber", {
              required: "Agent's number is required",
              pattern: {
                value: /^01[3-9]\d{8}$/,
                message: "Invalid Bangladeshi number format",
              },
            })}
          />
          {errors.agentNumber && (
            <span className="text-destructive text-xs">
              {errors.agentNumber.message}
            </span>
          )}
        </div>

        <div>
          <Input
            placeholder="৳ Amount"
            type="number"
            className="h-11"
            min={1}
            {...register("amount", {
              required: "Amount is required",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Minimum amount is ৳1",
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
          Cash Out
        </Button>
      </form>
    </div>
  );
};

export default CashOut;