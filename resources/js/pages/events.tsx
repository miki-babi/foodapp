import { router, Head } from "@inertiajs/react";
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ShareSheet } from "@/components/ShareSheet";
import { EVENTS, type Event } from "@/lib/mock-data";

export default function EventsPage() {
  return (
    <AppShell>
      <Head>
        <title>Events — Oasis</title>
      </Head>
      
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md px-5 pt-6 pb-4 flex items-center gap-3">
        <button
          onClick={() => router.visit("/lists")}
          className="size-9 rounded-full bg-accent flex items-center justify-center"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div>
          <h1 className="font-display font-bold text-2xl">Upcoming events</h1>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            This week in Addis
          </p>
        </div>
      </header>

      <main className="px-5 pb-32 lg:pb-8 space-y-4">
        {EVENTS.map((e, i) => (
          <EventCard key={e.id} event={e} delay={i * 80} />
        ))}
      </main>
    </AppShell>
  );
}

function EventCard({ event: e, delay }: { event: Event; delay: number }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [shareCount, setShareCount] = useState<number>(e.shares ?? e.going.length * 3);

  return (
    <article
      className="animate-feed-item bg-card rounded-3xl overflow-hidden ring-1 ring-black/[0.04] shadow-sm"
      style={{ animationDelay: `${delay}ms` }}
    >
      <img
        src={e.photo}
        alt={e.name}
        className="w-full aspect-[16/9] object-cover"
        loading="lazy"
      />
      <div className="p-5 space-y-3">
        <div className="flex items-baseline gap-2">
          <p className="font-display font-bold text-xs uppercase tracking-widest text-primary">
            {e.date}
          </p>
          <span className="text-muted-foreground text-xs">·</span>
          <p className="text-xs font-bold">{e.time}</p>
        </div>
        <h3 className="font-display font-bold text-xl leading-tight text-balance">
          {e.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {e.venue} · {e.price}
        </p>

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {e.going.map((initials) => (
                <div
                  key={initials}
                  className="size-7 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 ring-2 ring-card flex items-center justify-center text-[10px] font-bold"
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              {e.going.length} going
            </p>
          </div>
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-1.5 text-muted-foreground"
            aria-label="Share event"
          >
            <Send className="size-5" />
            <span className="text-xs font-mono">{shareCount}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button className="bg-accent text-foreground py-3 rounded-2xl font-bold text-xs">
            Go solo
          </button>
          <button className="bg-primary text-primary-foreground py-3 rounded-2xl font-bold text-xs shadow-md shadow-primary/25">
            Find group
          </button>
        </div>
      </div>

      <ShareSheet
        open={shareOpen}
        onOpenChange={setShareOpen}
        share={{ kind: "event", id: e.id }}
        onSent={(n) => setShareCount((c) => c + n)}
      />
    </article>
  );
}
