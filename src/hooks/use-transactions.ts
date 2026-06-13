import { BalanceIn, BalanceOut } from "@/lib/transaction-types";

const updateTransactionHistory = (
  type: BalanceIn | BalanceOut,
  amount: number,
) => {
  const transactionHistory = JSON.parse(
    localStorage.getItem("swiftpay_transactions") || "[]",
  );
  transactionHistory.push({ type, amount });
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
  return { balanceIn, balanceOut };
}
