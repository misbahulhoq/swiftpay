import React from "react";

export const generateStaticParams = () => {
  return [
    { slug: "bank-to-bkash" },
    { slug: "bkash-to-bank" },
    { slug: "send-money" },
    { slug: "mobile-recharge" },
    { slug: "bill-pay" },
  ];
};

const Page = () => {
  return <div>Page</div>;
};

export default Page;
