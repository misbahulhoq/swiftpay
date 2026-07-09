import {
  BadgePercent,
  Banknote,
  Building2,
  CircleDollarSign,
  CreditCard,
  Droplet,
  Flame,
  GraduationCap,
  Headphones,
  History,
  Landmark,
  Lightbulb,
  MapPin,
  Phone,
  QrCode,
  ReceiptText,
  ScanLine,
  Send,
  Shield,
  ShieldCheck,
  Smartphone,
  Tv,
  User,
  Users,
  Wifi,
} from "lucide-react";
import Link from "next/link";

const services = {
  "Money Transfer": [
    { slug: "send-money", label: "Send Money", icon: Send },
    { slug: "cash-out", label: "Cash Out", icon: Banknote },
    { slug: "add-money", label: "Add Money", icon: CircleDollarSign },
    {
      slug: "bank-to-swiftpay",
      label: "Bank to SwiftPay",
      icon: Building2,
    },
    {
      slug: "swiftpay-to-bank",
      label: "SwiftPay to Bank",
      icon: Landmark,
    },
    {
      slug: "card-to-swiftpay",
      label: "Card to SwiftPay",
      icon: CreditCard,
    },
  ],
  Payments: [
    {
      slug: "mobile-recharge",
      label: "Mobile Recharge",
      icon: Smartphone,
    },
    { slug: "merchant-pay", label: "Merchant Pay", icon: ScanLine },
    { slug: "scan", label: "Scan to Pay", icon: QrCode },
  ],
  "Bill Pay": [
    { slug: "bill-pay", label: "Pay Bill", icon: ReceiptText },
    {
      slug: "electricity-bill",
      label: "Electricity Bill",
      icon: Lightbulb,
    },
    { slug: "gas-bill", label: "Gas Bill", icon: Flame },
    { slug: "water-bill", label: "Water Bill", icon: Droplet },
    { slug: "internet-bill", label: "Internet Bill", icon: Wifi },
    { slug: "telephone-bill", label: "Telephone Bill", icon: Phone },
    { slug: "tv-bill", label: "TV Bill", icon: Tv },
    {
      slug: "credit-card-bill",
      label: "Credit Card Bill",
      icon: CreditCard,
    },
    { slug: "education-fee", label: "Education Fee", icon: GraduationCap },
  ],
  General: [
    { slug: "offers", label: "Offers", icon: BadgePercent },
    { slug: "nearby-agents", label: "Nearby Agents", icon: MapPin },
    { slug: "statements", label: "Statements", icon: History },
    {
      slug: "saved-recipients",
      label: "Saved Recipients",
      icon: Users,
    },
    {
      slug: "limits-charges",
      label: "Limits & Charges",
      icon: Shield,
    },
    { slug: "profile", label: "Profile", icon: User },
    { slug: "security", label: "Security", icon: ShieldCheck },
    { slug: "support", label: "Support", icon: Headphones },
  ],
};

const ServicesPage = () => {
  return (
    <div className="space-y-6">
      {Object.entries(services).map(([category, items]) => (
        <section key={category}>
          <h2 className="mb-3 text-lg font-semibold">{category}</h2>
          <div className="grid grid-cols-4 gap-3">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="bg-card ring-foreground/5 hover:bg-muted flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl p-2 text-center text-xs font-medium shadow-sm ring-1 transition-colors"
                >
                  <span className="bg-muted text-foreground flex size-10 items-center justify-center rounded-full">
                    <Icon />
                  </span>
                  <span className="leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ServicesPage;
