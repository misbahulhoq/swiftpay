export const BalanceInValues = [
  "bank-to-swiftpay",
  "cash-in",
  "card-to-swiftpay",
] as const;
export type BalanceIn = (typeof BalanceInValues)[number];

export const BalanceOutValues = [
  "cash-out",
  "swiftpay-to-bank", // also known as transfer
  "send-money",
  "merchant-pay",
  "recharge",
  "electricity-bill",
  "gas-bill",
  "water-bill",
  "internet-bill",
  "telephone-bill",
  "tv-bill",
  "credit-card-bill",
  "education-fee",
] as const;

export type BalanceOut = (typeof BalanceOutValues)[number];

export const isBalanceIn = (value: string): value is BalanceIn => {
  return (BalanceInValues as readonly string[]).includes(value);
};
export const isBalanceOut = (value: string): value is BalanceOut => {
  return (BalanceOutValues as readonly string[]).includes(value);
};

export type TransactionType = BalanceIn | BalanceOut | "request";

export const transactionLabels: Record<TransactionType, string> = {
  "cash-in": "Add Money",
  "cash-out": "Cash Out",
  "bank-to-swiftpay": "Bank to Swiftpay",
  "card-to-swiftpay": "Card to Swiftpay",
  "swiftpay-to-bank": "Swiftpay to Bank",
  "send-money": "Send Money",
  "merchant-pay": "Merchant Pay",
  recharge: "Recharge",
  request: "Request Money",
  "electricity-bill": "Electricity Bill",
  "gas-bill": "Gas Bill",
  "water-bill": "Water Bill",
  "internet-bill": "Internet Bill",
  "telephone-bill": "Telephone Bill",
  "tv-bill": "TV Bill",
  "credit-card-bill": "Credit Card Bill",
  "education-fee": "Education Fee",
};

export const transactions: {
  type: TransactionType;
  label: string;
}[] = [
  {
    label: "Bank to Swiftpay",
    type: "bank-to-swiftpay",
  },
  {
    label: "Card to Swiftpay",
    type: "card-to-swiftpay",
  },
  {
    label: "Swiftpay to Bank",
    type: "swiftpay-to-bank",
  },
  {
    label: "Send Money",
    type: "send-money",
  },
  {
    label: "Electricity Bill",
    type: "electricity-bill",
  },
  {
    label: "Gas Bill",
    type: "gas-bill",
  },
  {
    label: "Water Bill",
    type: "water-bill",
  },
  {
    label: "Internet Bill",
    type: "internet-bill",
  },
  {
    label: "Telephone Bill",
    type: "telephone-bill",
  },
  {
    label: "TV Bill",
    type: "tv-bill",
  },
  {
    label: "Credit Card Bill",
    type: "credit-card-bill",
  },
  {
    label: "Education Fee",
    type: "education-fee",
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
