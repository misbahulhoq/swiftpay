"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/use-transactions";

interface IForm {
  cardNumber: string;
  amount: number;
}

const CardToSwiftpay = () => {
  const { balanceIn } = useTransactions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const handleBalanceAdd = async (data: IForm) => {
    try {
      balanceIn("card-to-swiftpay", data.amount);
      toast.success("Balance added successfully", {
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
        Enter card number and amount
      </h2>
      <form
        onSubmit={handleSubmit(handleBalanceAdd)}
        className="flex flex-col gap-3"
      >
        <div>
          <Input
            autoComplete="off"
            placeholder="Card number"
            className="h-11"
            {...register("cardNumber", {
              required: "Card number is required",
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
                value: 100,
                message: "Minimum amount is ৳100",
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
          Add
        </Button>
      </form>
    </div>
  );
};

export default CardToSwiftpay;
