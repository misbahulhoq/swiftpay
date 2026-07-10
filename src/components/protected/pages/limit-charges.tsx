import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const limits = [
  {
    service: "Send Money",
    perTransaction: "৳25,000",
    daily: "৳50,000",
    monthly: "৳300,000",
  },
  {
    service: "Mobile Recharge",
    perTransaction: "৳1,000",
    daily: "৳10,000",
    monthly: "৳30,000",
  },
  {
    service: "Cash Out from Agent",
    perTransaction: "৳25,000",
    daily: "৳25,000",
    monthly: "৳150,000",
  },
  {
    service: "Cash Out from ATM",
    perTransaction: "৳20,000",
    daily: "৳20,000",
    monthly: "৳150,000",
  },
  {
    service: "Payment",
    perTransaction: "No Limit",
    daily: "No Limit",
    monthly: "No Limit",
  },
];

const LimitCharges = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Limits & Charges</h1>
      <p className="mb-8">
        Here are the limits for your SwiftPay account. These limits are subject
        to change.
      </p>
      <Table>
        <TableCaption>Your transaction limits.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Limit per Transaction</TableHead>
            <TableHead>Daily Limit</TableHead>
            <TableHead>Monthly Limit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {limits.map((limit) => (
            <TableRow key={limit.service}>
              <TableCell className="font-medium">{limit.service}</TableCell>
              <TableCell>{limit.perTransaction}</TableCell>
              <TableCell>{limit.daily}</TableCell>
              <TableCell>{limit.monthly}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LimitCharges;