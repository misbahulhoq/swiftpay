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
  CreditCard,
  Headphones,
  Landmark,
  Lightbulb,
  MapPin,
  MoreHorizontal,
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
import { useEffect, useMemo, useRef, useState } from "react";

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
import { useBalance } from "@/hooks/use-balance";
import { useTransactions } from "@/hooks/use-transactions";
import { isBalanceIn } from "@/lib/transaction-types";

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
  const balance = useBalance();
  const { getTransactionHistory } = useTransactions();
  const user = useMemo(() => getStoredUser(), []);
  const firstName = user?.name?.split(" ")[0] || "there";
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const balanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (balanceTimerRef.current) {
        clearTimeout(balanceTimerRef.current);
      }
    };
  }, []);

  const revealBalance = () => {
    if (balanceTimerRef.current) {
      clearTimeout(balanceTimerRef.current);
    }

    setIsBalanceVisible(true);
    balanceTimerRef.current = setTimeout(() => {
      setIsBalanceVisible(false);
      balanceTimerRef.current = null;
    }, 4000);
  };

  return (
    <main className="bg-background min-h-screen px-4 pt-4 pb-5">
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
            <CardTitle
              aria-live="polite"
              className="min-h-9 text-3xl font-semibold tracking-normal tabular-nums"
            >
              Tk {isBalanceVisible ? balance : " ••••••"}
            </CardTitle>
            <CardAction>
              <Button variant="secondary" size="sm" onClick={revealBalance}>
                <Sparkles data-icon="inline-start" />
                {isBalanceVisible ? "Viewing" : "Tap to view"}
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
            {getTransactionHistory()
              .slice(0, 3)
              .map((item, index) => {
                const balanceIn = isBalanceIn(item.type);

                return (
                  <Link
                    key={index}
                    href="/transactions"
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-full">
                        {balanceIn ? <ArrowDownLeft /> : <ArrowUpRight />}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {item.type}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {item.transactionTime}
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
    </main>
  );
};

export default HomePage;
