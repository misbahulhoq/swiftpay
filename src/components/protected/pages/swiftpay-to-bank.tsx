"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/use-transactions";
import { bankList } from "@/lib/bank-list";
import { Label } from "@/components/ui/label";

interface IForm {
  bankName: string;
  accountNumber: string;
  amount: number;
}

const SwiftpayToBank = () => {
  const { balanceOut } = useTransactions();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const handleTransfer = async (data: IForm) => {
    try {
      balanceOut("swiftpay-to-bank", data.amount);
      toast.success(
        `Successfully transferred ৳${data.amount} to ${data.bankName}`,
      );
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
        Enter bank details and amount
      </h2>
      <form
        onSubmit={handleSubmit(handleTransfer)}
        className="flex flex-col gap-3"
      >
        <div>
          <Label htmlFor="bankName" className="mb-2">
            Bank Name
          </Label>
          <select
            id="bankName"
            className="border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            {...register("bankName", {
              required: "Bank name is required",
            })}
          >
            <option value="">Select a bank</option>
            {bankList.map((bank) => (
              <option key={bank.name} value={bank.name}>
                {bank.name}
              </option>
            ))}
          </select>
          {errors.bankName && (
            <span className="text-destructive text-xs">
              {errors.bankName.message}
            </span>
          )}
        </div>

        <div>
          <Input
            autoComplete="off"
            placeholder="Account Number"
            className="h-11"
            {...register("accountNumber", {
              required: "Account number is required",
              minLength: {
                value: 10,
                message: "Account number must be at least 10 digits",
              },
            })}
          />
          {errors.accountNumber && (
            <span className="text-destructive text-xs">
              {errors.accountNumber.message}
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
          Transfer
        </Button>
      </form>
    </div>
  );
};

export default SwiftpayToBank;
