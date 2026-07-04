"use client";

import { useEffect, useState } from "react";

import { useTransactions } from "@/hooks/use-transactions";
import { isBalanceIn, transactions } from "@/lib/transaction-types";

type Transaction = {
  type: string;
  amount: number;
  transactionTime: string;
};

const Statements = () => {
  const { getTransactionHistory } = useTransactions();
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(
    [],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTransactionHistory(getTransactionHistory());
  }, [getTransactionHistory]);

  const getTransactionLabel = (type: string) => {
    const transaction = transactions.find((t) => t.type === type);
    return transaction ? transaction.label : type;
  };

  return (
    <div>
      <h2 className="text-muted-foreground mb-3 text-lg">Statements</h2>
      {transactionHistory.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <div className="flex flex-col gap-3 pb-16">
          {transactionHistory.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-semibold">
                  {getTransactionLabel(transaction.type)}
                </p>
                <p className="text-muted-foreground text-sm">
                  {transaction.transactionTime}
                </p>
              </div>
              <p
                className={`font-semibold ${
                  isBalanceIn(transaction.type)
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {isBalanceIn(transaction.type) ? "+" : "-"} ৳
                {transaction.amount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Statements;
