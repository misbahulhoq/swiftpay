import { componentMap } from "@/components/protected/component-map";

export const paths = [
  { slug: "add-money" },
  { slug: "bank-to-bkash" },
  { slug: "bill-pay" },
  { slug: "bkash-to-bank" },
  { slug: "cash-out" },
  { slug: "electricity-bill" },
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
] as const;

export const generateStaticParams = () => {
  return paths;
};

export type Slug = (typeof paths)[number]["slug"];

const Page = async ({ params }: { params: Promise<{ slug: Slug }> }) => {
  const { slug } = await params;

  return componentMap[slug];
};

export default Page;
