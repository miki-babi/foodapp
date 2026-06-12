import { Link, usePage } from "@inertiajs/react";
import { Home, MessageCircle, Bookmark, User, Plus } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/chats", label: "Chats", icon: MessageCircle },
  { href: "/add", label: "Add", icon: Plus },
] as const;

const tabsRight = [
  { href: "/lists", label: "Lists", icon: Bookmark },
  { href: "/me", label: "Me", icon: User },
] as const;

export function BottomNav() {
  const { url } = usePage();
  const pathname = url.split("?")[0];

  const isActive = (to: string) =>
    to === "/"
      ? pathname === "/"
      : pathname.startsWith(to) || (to === "/chats" && pathname.startsWith("/chat"));

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border px-4 py-3 pb-8 flex items-center justify-between z-50">
      {tabs.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive(href) ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Icon className="size-6" strokeWidth={isActive(href) ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
        </Link>
      ))}

      {/* <div className="-mt-12">
        <Link
          href="/add"
          className="size-14 bg-primary rounded-full shadow-xl shadow-primary/40 flex items-center justify-center text-primary-foreground border-4 border-background active:scale-90 transition-transform"
        >
          <Plus className="size-8" strokeWidth={3} />
        </Link>
      </div> */}

      {tabsRight.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive(href) ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Icon className="size-6" strokeWidth={isActive(href) ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
