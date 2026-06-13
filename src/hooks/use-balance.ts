export function useBalance() {
  const currentBalance = localStorage.getItem("swiftpay_balance") || 0;
  return currentBalance;
}
