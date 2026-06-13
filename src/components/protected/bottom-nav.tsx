import Link from "next/link";
import {
  Home,
  Clock3,
  QrCode,
  MessageSquareText,
  UserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";

const bottomNav = [
  { label: "Home", href: "/home", icon: Home },
  { label: "History", href: "/transactions", icon: Clock3 },
  { label: "Scan", href: "/scan", icon: QrCode },
  { label: "Inbox", href: "/inbox", icon: MessageSquareText },
  { label: "Profile", href: "/profile", icon: UserRound },
];

const BottomNav = () => {
  const pathName = usePathname();
  return (
    <nav className="bg-card ring-foreground/10 fixed bottom-2 left-1/2 grid w-[calc(100%-2.5rem)] max-w-lg -translate-x-1/2 grid-cols-5 rounded-3xl p-2 shadow-lg ring-1">
      {bottomNav.map((item) => {
        const Icon = item.icon;
        const active = item.href === pathName;

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
  );
};

export default BottomNav;
