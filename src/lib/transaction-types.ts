export const BalanceInValues = ["bank-to-bkash", "cash-in"] as const;
export type BalanceIn = (typeof BalanceInValues)[number];
export const BalanceOutValues = [
  "cash-out",
  "bkash-to-bank", // also known as transfer
  "bank-to-bkash",
  "send-money",
  "pay-bill",
  "merchant-pay",
  "recharge",
] as const;

export type BalanceOut = (typeof BalanceOutValues)[number];

export const isBalanceIn = (value: string): value is BalanceIn => {
  return (BalanceInValues as readonly string[]).includes(value);
};
export const isBalanceOut = (value: string): value is BalanceOut => {
  return (BalanceOutValues as readonly string[]).includes(value);
};

export type TransactionType = BalanceIn | BalanceOut | "request";

export const transactions: {
  type: TransactionType;
  label: string;
}[] = [
  {
    label: "Bank to Bkash",
    type: "bank-to-bkash",
  },
  {
    label: "Bkash to Bank",
    type: "bkash-to-bank",
  },
  {
    label: "Send Money",
    type: "send-money",
  },
  {
    label: "Pay Bill",
    type: "pay-bill",
  },
  {
    label: "Merchant Pay",
    type: "merchant-pay",
  },
  {
    label: "Recharge",
    type: "recharge",
  },
  {
    label: "Request Money",
    type: "request",
  },
];
