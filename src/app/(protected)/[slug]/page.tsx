import { componentMap } from "@/components/protected/component-map";

export const paths = [
  { slug: "add-money" },
  { slug: "bank-to-swiftpay" },
  { slug: "card-to-swiftpay" },
  { slug: "bill-pay" },
  { slug: "swiftpay-to-bank" },
  { slug: "cash-out" },
  { slug: "credit-card-bill" },
  { slug: "education-fee" },
  { slug: "electricity-bill" },
  { slug: "gas-bill" },
  { slug: "internet-bill" },
  { slug: "limits-charges" },
  { slug: "merchant-pay" },
  { slug: "mobile-recharge" },
  { slug: "nearby-agents" },
  { slug: "offers" },
  { slug: "profile" },
  { slug: "saved-recipients" },
  { slug: "scan" },
  { slug: "security" },
  { slug: "send-money" },
  { slug: "services" },
  { slug: "statements" },
  { slug: "support" },
  { slug: "telephone-bill" },
  { slug: "tv-bill" },
  { slug: "transactions" },
  { slug: "water-bill" },
] as const;

export type Slug = (typeof paths)[number]["slug"];

export const generateStaticParams = () => {
  return paths.map((path) => ({ ...path }));
};

const Page = async ({ params }: { params: Promise<{ slug: Slug }> }) => {
  const { slug } = await params;

  return <div className="px-4 pt-5 pb-8">{componentMap[slug]}</div>;
};

export default Page;
