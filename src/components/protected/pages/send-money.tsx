"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/use-transactions";

interface IForm {
  recipient: string;
  amount: number;
}

const SendMoney = () => {
  const { balanceOut } = useTransactions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const handleSendMoney = async (data: IForm) => {
    try {
      balanceOut("send-money", data.amount);
      toast.success("Money sent successfully", {
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
        Enter recipient&apos;s number and amount
      </h2>
      <form
        onSubmit={handleSubmit(handleSendMoney)}
        className="flex flex-col gap-3"
      >
        <div>
          <Input
            autoComplete="off"
            placeholder="Recipient's number"
            className="h-11"
            {...register("recipient", {
              required: "Recipient's number is required",
              pattern: {
                value: /^01[3-9]\d{8}$/,
                message: "Invalid Bangladeshi number format",
              },
            })}
          />
          {errors.recipient && (
            <span className="text-destructive text-xs">
              {errors.recipient.message}
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
          Send
        </Button>
      </form>
    </div>
  );
};

export default SendMoney;