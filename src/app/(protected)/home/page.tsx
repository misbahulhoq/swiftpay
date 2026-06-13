"use client";

import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BadgePercent,
  Banknote,
  Bell,
  Building2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Headphones,
  Home,
  Landmark,
  Lightbulb,
  MapPin,
  MessageSquareText,
  MoreHorizontal,
  Phone,
  QrCode,
  ReceiptText,
  ScanLine,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserRound,
  WalletCards,
} from "lucide-react";
import React, { useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StoredUser = {
  name?: string;
  phoneNumber?: string;
};

const moneyActions = [
  { label: "Send Money", href: "/send-money", icon: Send },
  { label: "Cash Out", href: "/cash-out", icon: Banknote },
  { label: "Recharge", href: "/mobile-recharge", icon: Smartphone },
  { label: "Add Money", href: "/add-money", icon: CircleDollarSign },
  { label: "Pay Bill", href: "/bill-pay", icon: ReceiptText },
  { label: "Merchant Pay", href: "/merchant-pay", icon: ScanLine },
  { label: "Transfer", href: "/bkash-to-bank", icon: Landmark },
  { label: "Request", href: "/request-money", icon: ArrowDownLeft },
];

const serviceLinks = [
  { label: "Electricity", href: "/electricity-bill", icon: Lightbulb },
  { label: "Bank Link", href: "/bank-to-bkash", icon: Building2 },
  { label: "Offers", href: "/offers", icon: BadgePercent },
  { label: "Support", href: "/support", icon: Headphones },
];

const activity = [
  {
    title: "Sent to Rafi Ahmed",
    meta: "Today, 10:42 AM",
    amount: "- Tk 1,250",
    icon: ArrowUpRight,
  },
  {
    title: "Cash in from agent",
    meta: "Yesterday, 7:18 PM",
    amount: "+ Tk 5,000",
    icon: ArrowDownLeft,
  },
  {
    title: "Mobile recharge",
    meta: "Jun 11, 9:02 PM",
    amount: "- Tk 299",
    icon: Phone,
  },
];

const bottomNav = [
  { label: "Home", href: "/home", icon: Home },
  { label: "History", href: "/transactions", icon: Clock3 },
  { label: "Scan", href: "/scan", icon: QrCode },
  { label: "Inbox", href: "/inbox", icon: MessageSquareText },
  { label: "Profile", href: "/profile", icon: UserRound },
];

function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return JSON.parse(sessionStorage.getItem("user") || "null") as StoredUser;
  } catch {
    return null;
  }
}

const HomePage = () => {
  const user = useMemo(() => getStoredUser(), []);
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <main className="bg-background min-h-screen pt-4 pb-5">
      <div className="flex flex-col gap-5 pb-24">
        <header className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="bg-primary text-primary-foreground flex size-11 shrink-0 items-center justify-center rounded-full">
              <UserRound />
            </div>
            <div className="min-w-0">
              <p className="text-muted-foreground text-sm">Good morning</p>
              <h1 className="truncate text-xl font-semibold tracking-normal">
                {firstName}
              </h1>
            </div>
          </div>
          <Button variant="outline" size="icon-lg" aria-label="Notifications">
            <Bell />
          </Button>
        </header>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardDescription className="text-primary-foreground/70">
              Available balance
            </CardDescription>
            <CardTitle className="text-3xl font-semibold tracking-normal">
              Tk 28,450.75
            </CardTitle>
            <CardAction>
              <Button variant="secondary" size="sm">
                <Sparkles data-icon="inline-start" />
                Tap to view
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="bg-primary-foreground/10 flex items-center justify-between rounded-2xl p-3">
              <div className="flex items-center gap-3">
                <WalletCards className="shrink-0" />
                <div>
                  <p className="text-sm font-medium">SwiftPay Wallet</p>
                  <p className="text-primary-foreground/65 text-xs">
                    {user?.phoneNumber || "Personal account"}
                  </p>
                </div>
              </div>
              <CreditCard className="shrink-0" />
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button asChild variant="secondary" className="flex-1">
              <Link href="/add-money">
                <CircleDollarSign data-icon="inline-start" />
                Add Money
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/statements">
                <ReceiptText data-icon="inline-start" />
                Statement
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Quick actions</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/services">
                More
                <MoreHorizontal data-icon="inline-end" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {moneyActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="bg-card ring-foreground/5 hover:bg-muted flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl p-2 text-center text-xs font-medium shadow-sm ring-1 transition-colors"
                >
                  <span className="bg-muted text-foreground flex size-10 items-center justify-center rounded-full">
                    <Icon />
                  </span>
                  <span className="leading-tight">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <Link
            href="/scan"
            className="bg-secondary text-secondary-foreground ring-foreground/5 hover:bg-muted flex min-h-28 flex-col justify-between rounded-2xl p-4 ring-1 transition-colors"
          >
            <QrCode />
            <span className="text-sm font-semibold">Scan QR to pay</span>
          </Link>
          <Link
            href="/nearby-agents"
            className="bg-secondary text-secondary-foreground ring-foreground/5 hover:bg-muted flex min-h-28 flex-col justify-between rounded-2xl p-4 ring-1 transition-colors"
          >
            <MapPin />
            <span className="text-sm font-semibold">Nearby agents</span>
          </Link>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Your latest wallet movements</CardDescription>
            <CardAction>
              <Button asChild variant="ghost" size="sm">
                <Link href="/transactions">View all</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {activity.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href="/transactions"
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-full">
                      <Icon />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {item.title}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {item.meta}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-semibold">
                    {item.amount}
                  </span>
                </Link>
              );
            })}
          </CardContent>
          <CardFooter className="border-t">
            <Button asChild variant="outline" className="w-full">
              <Link href="/saved-recipients">
                <UserRound data-icon="inline-start" />
                Manage saved recipients
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <section className="flex flex-col gap-3">
          <h2 className="text-base font-semibold">Services for you</h2>
          <div className="grid grid-cols-2 gap-3">
            {serviceLinks.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.label}
                  href={service.href}
                  className="bg-card ring-foreground/5 hover:bg-muted flex items-center gap-3 rounded-2xl p-4 text-sm font-medium shadow-sm ring-1 transition-colors"
                >
                  <span className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-full">
                    <Icon />
                  </span>
                  <span className="min-w-0 truncate">{service.label}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Security center</CardTitle>
            <CardDescription>
              Keep your wallet protected with device and PIN checks.
            </CardDescription>
          </CardHeader>
          <CardFooter className="gap-2">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/security">
                <ShieldCheck data-icon="inline-start" />
                Review
              </Link>
            </Button>
            <Button asChild variant="ghost" className="flex-1">
              <Link href="/limits-charges">Limits</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <nav className="bg-card ring-foreground/10 fixed bottom-3 left-1/2 grid w-[calc(100%-2.5rem)] max-w-lg -translate-x-1/2 grid-cols-5 rounded-3xl p-2 shadow-lg ring-1">
        {bottomNav.map((item) => {
          const Icon = item.icon;
          const active = item.label === "Home";

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </main>
  );
};

export default HomePage;
