"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Search, XIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { bankList } from "@/lib/bank-list";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/use-transactions";

interface IForm {
  accountNumber: string;
  amount: number;
}

const BankToBkash = () => {
  const { balanceIn } = useTransactions();
  const [search, setSearch] = useState("");
  const [selectedBank, setSelectedBank] = useState<(typeof bankList)[0] | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="text-foreground">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  const handleBalanceAdd = async (data: IForm) => {
    try {
      balanceIn("bank-to-bkash", data.amount);
      toast.success("Balance added successfully", { position: "top-center" });
    } catch (_err) {
      toast.error((_err as Error).message || "Something went wrong", {
        position: "top-center",
      });
    } finally {
      reset();
    }
  };

  if (selectedBank) {
    return (
      <div>
        <h2 className="text-muted-foreground mb-3 text-lg">
          Enter {selectedBank.name} ({selectedBank.shortName}) account number
          and amount
        </h2>
        <form
          onSubmit={handleSubmit(handleBalanceAdd)}
          className="flex flex-col gap-3"
        >
          <div>
            <Input
              autoComplete="off"
              placeholder="Account number"
              className="h-11"
              {...register("accountNumber", {
                required: "Account number is required",
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
              min={10}
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
  }

  return (
    <div>
      <section>
        <InputGroup className="">
          <InputGroupInput
            placeholder="Search..."
            className=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          {search.length > 0 && (
            <InputGroupAddon align="inline-end">
              <button onClick={() => setSearch("")} className="pr-1">
                <XIcon size={18} />
              </button>
            </InputGroupAddon>
          )}
        </InputGroup>
      </section>

      <section className="mt-3">
        {bankList
          .filter(
            (bank) =>
              bank.name.toLowerCase().includes(search.toLowerCase()) ||
              bank.shortName.toLowerCase().includes(search.toLowerCase()),
          )
          .map((bank, index) => {
            const { shortName, name } = bank;
            return (
              <button
                key={index}
                className="my-1.5 block cursor-pointer py-2.5"
                onClick={() => {
                  setSelectedBank(bank);
                  setSearch("");
                }}
              >
                <p className="text-muted-foreground">
                  {getHighlightedText(name, search)} (
                  {getHighlightedText(shortName, search)})
                </p>
              </button>
            );
          })}
      </section>
    </div>
  );
};

export default BankToBkash;
