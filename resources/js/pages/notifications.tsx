import { router, Head } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { NOTIFICATIONS } from "@/lib/mock-data";

export default function NotificationsPage() {
  return (
    <AppShell>
      <Head>
        <title>Notifications — Oasis</title>
      </Head>
      
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md px-5 pt-6 pb-4 flex items-center gap-3">
        <button
          onClick={() => router.visit("/")}
          className="size-9 rounded-full bg-accent flex items-center justify-center"
        >
          <ArrowLeft className="size-4" />
        </button>
        <h1 className="font-display font-bold text-2xl">Activity</h1>
      </header>
      
      <main className="px-5 pb-32 space-y-2">
        {NOTIFICATIONS.map((n, i) => (
          <div
            key={n.id}
            className="animate-feed-item bg-card rounded-2xl p-4 ring-1 ring-black/[0.04] flex items-start gap-3"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="size-2 rounded-full bg-primary mt-2 shrink-0" />
            <div className="flex-1">
              <p className="text-sm leading-snug">{n.text}</p>
              <p className="text-[10px] font-mono text-muted-foreground mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </main>
    </AppShell>
  );
}
