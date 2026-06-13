export const paths = [
  { slug: "add-money" },
  { slug: "bank-to-bkash" },
  { slug: "bill-pay" },
  { slug: "bkash-to-bank" },
  { slug: "cash-out" },
  { slug: "electricity-bill" },
  { slug: "inbox" },
  { slug: "limits-charges" },
  { slug: "merchant-pay" },
  { slug: "mobile-recharge" },
  { slug: "nearby-agents" },
  { slug: "offers" },
  { slug: "profile" },
  { slug: "request-money" },
  { slug: "saved-recipients" },
  { slug: "scan" },
  { slug: "security" },
  { slug: "send-money" },
  { slug: "services" },
  { slug: "statements" },
  { slug: "support" },
  { slug: "transactions" },
];

export const generateStaticParams = () => {
  return paths;
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  console.log(slug);
  return <div>Page</div>;
};

export default Page;
