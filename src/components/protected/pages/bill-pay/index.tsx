import Link from "next/link";

const billPayOptions = [
  { name: "Electricity", href: "/electricity-bill" },
  { name: "Gas", href: "/gas-bill" },
  { name: "Water", href: "/water-bill" },
  { name: "Internet", href: "/internet-bill" },
  { name: "Telephone", href: "/telephone-bill" },
  { name: "TV", href: "/tv-bill" },
  { name: "Credit Card", href: "/credit-card-bill" },
  { name: "Education", href: "/education-fee" },
];

const BillPay = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Bill Pay</h2>
      <div className="grid grid-cols-1 gap-4">
        {billPayOptions.map((option) => (
          <Link
            href={option.href}
            key={option.name}
            className="bg-background hover:bg-foreground/5 cursor-pointer rounded-lg p-4 shadow"
          >
            {option.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BillPay;
