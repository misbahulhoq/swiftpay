"use client";

import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { bankList } from "@/lib/bank-list";
import { Search, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BankToBkash = () => {
  const [search, setSearch] = useState("");
  const [selectedBank, setSelectedBank] = useState<(typeof bankList)[0] | null>(
    null,
  );
  const [amount, setAmount] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    accountNumber: "",
    amount: "",
  });

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

  const handleBalanceAdd = () => {
    if (!amount) {
      setErrorMessage((prev) => ({
        ...prev,
        amount: "Amount is required",
      }));
    }
    if (!accountNumber) {
      setErrorMessage((prev) => ({
        ...prev,
        accountNumber: "Account number is required",
      }));
    }
    if (!amount || !accountNumber) return;
  };

  if (selectedBank) {
    return (
      <div>
        <h2 className="text-muted-foreground mb-3 text-lg">
          Enter {selectedBank.name} ({selectedBank.shortName}) account number
          and amount
        </h2>
        <section className="flex flex-col gap-3">
          <div>
            <Input
              placeholder="Account number"
              className="h-11"
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            {errorMessage.accountNumber && (
              <span className="text-destructive text-xs">
                {errorMessage.accountNumber}
              </span>
            )}
          </div>

          <div>
            <Input
              placeholder="৳ Amount"
              type="number"
              className="h-11"
              min={10}
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
            />
            {errorMessage.amount && (
              <span className="text-destructive text-xs">
                {errorMessage.amount}
              </span>
            )}
          </div>

          <Button
            className="h-11 w-25 self-end rounded-full"
            onClick={handleBalanceAdd}
          >
            Add
          </Button>
        </section>
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
