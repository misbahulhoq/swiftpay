import type { BalanceIn, BalanceOut } from "@/lib/transaction-types";
type Transaction = {
  type: string;
  amount: number;
  transactionTime: string;
};

const getTransactionHistory = () => {
  return JSON.parse(
    localStorage.getItem("swiftpay_transactions") || "[]",
  ) as Transaction[];
};

const updateTransactionHistory = (
  type: BalanceIn | BalanceOut,
  amount: number,
) => {
  const transactionHistory = JSON.parse(
    localStorage.getItem("swiftpay_transactions") || "[]",
  );
  const now = new Date();
  const transactionTime = now.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  transactionHistory.push({ type, amount, transactionTime });
  localStorage.setItem(
    "swiftpay_transactions",
    JSON.stringify(transactionHistory),
  );
};
const balanceIn = (type: BalanceIn, amount: number) => {
  const currentBalance = JSON.parse(
    localStorage.getItem("swiftpay_balance") || "0",
  );
  const newBalance = currentBalance + amount;
  localStorage.setItem("swiftpay_balance", JSON.stringify(newBalance));
  // update transaction history
  updateTransactionHistory(type, amount);
};
const balanceOut = (type: BalanceOut, amount: number) => {
  const currentBalance = JSON.parse(
    localStorage.getItem("swiftpay_balance") || "0",
  );
  if (amount > currentBalance) {
    throw new Error("Insufficient balance");
  }
  const newBalance = currentBalance - amount;
  localStorage.setItem("swiftpay_balance", JSON.stringify(newBalance));
  // update transaction history
  updateTransactionHistory(type, amount);
};

export function useTransactions() {
  return { balanceIn, balanceOut, getTransactionHistory };
}
