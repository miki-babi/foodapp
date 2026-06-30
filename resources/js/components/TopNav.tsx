import { Link, usePage } from "@inertiajs/react";
import { NAV_TABS, isNavActive } from "@/lib/nav-tabs";

export function TopNav() {
  const { url } = usePage();
  const pathname = url.split("?")[0];

  return (
    <nav className="hidden lg:flex sticky top-0 z-50 w-full h-16 border-b border-border bg-card/80 backdrop-blur-md items-center justify-between px-8">
      <Link href="/" className="font-display font-bold text-xl tracking-tight shrink-0">
        Oasis
      </Link>

      <div className="flex items-center gap-1">
        {NAV_TABS.map(({ href, label, icon: Icon }) => {
          const active = isNavActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                active
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
