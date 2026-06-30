import { Home, MessageCircle, Bookmark, User, Plus } from "lucide-react";

export const NAV_TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/chats", label: "Chats", icon: MessageCircle },
  { href: "/add", label: "Add", icon: Plus },
  { href: "/lists", label: "Lists", icon: Bookmark },
  { href: "/me", label: "Me", icon: User },
] as const;

export function isNavActive(pathname: string, to: string) {
  return to === "/"
    ? pathname === "/"
    : pathname.startsWith(to) || (to === "/chats" && pathname.startsWith("/chat"));
}
