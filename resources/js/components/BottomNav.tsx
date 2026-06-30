import { Link, usePage } from "@inertiajs/react";
import { NAV_TABS, isNavActive } from "@/lib/nav-tabs";

export function BottomNav() {
  const { url } = usePage();
  const pathname = url.split("?")[0];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 w-full bg-card border-t border-border px-4 py-3 pb-8 flex items-center justify-between z-50">
      {NAV_TABS.map(({ href, label, icon: Icon }) => {
        const active = isNavActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 transition-colors ${
              active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className="size-6" strokeWidth={active ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
