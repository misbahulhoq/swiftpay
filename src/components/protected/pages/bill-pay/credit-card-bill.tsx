"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/use-transactions";

interface IForm {
  cardNumber: string;
  amount: number;
}

const CreditCardBill = () => {
  const { balanceOut } = useTransactions();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const handlePayment = async (data: IForm) => {
    try {
      balanceOut("credit-card-bill", data.amount);
      toast.success("Credit card bill paid successfully");
      reset();
    } catch (err) {
      toast.error((err as Error).message || "Something went wrong", {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <h2 className="text-muted-foreground mb-3 text-lg">
        Enter card number and amount
      </h2>
      <form
        onSubmit={handleSubmit(handlePayment)}
        className="flex flex-col gap-3"
      >
        <div>
          <Input
            autoComplete="off"
            placeholder="Card Number"
            className="h-11"
            {...register("cardNumber", {
              required: "Card number is required",
              pattern: {
                value: /^\d{16}$/,
                message: "Card number must be 16 digits",
              },
            })}
          />
          {errors.cardNumber && (
            <span className="text-destructive text-xs">
              {errors.cardNumber.message}
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
    </div>
  );
};

export default CreditCardBill;