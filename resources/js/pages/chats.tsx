import { Link, router, Head } from "@inertiajs/react";
import { useSyncExternalStore } from "react";
import { Search, Plus, X, Lock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { CHATS, PLACES, LISTS, EVENTS } from "@/lib/mock-data";
import { Avatar } from "@/components/Avatar";
import {
  clearPendingShare,
  getPendingShare,
  subscribePendingShare,
} from "@/lib/share-store";

function usePendingShare() {
  const raw = useSyncExternalStore(
    (cb) => subscribePendingShare(cb),
    () => {
      try {
        return sessionStorage.getItem("oasis_pending_share");
      } catch {
        return null;
      }
    },
    () => null
  );
  return raw ? (JSON.parse(raw) as ReturnType<typeof getPendingShare>) : null;
}

export default function ChatsPage() {
  const pending = usePendingShare();

  const pendingLabel = pending
    ? pending.kind === "place"
      ? PLACES.find((p) => p.id === pending.id)?.name
      : pending.kind === "list"
      ? LISTS.find((l) => l.id === pending.id)?.name
      : EVENTS.find((e) => e.id === pending.id)?.name
    : null;

  return (
    <AppShell>
      <Head>
        <title>Chats — Oasis</title>
      </Head>
      
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md px-5 pt-6 pb-3">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="font-display font-bold text-2xl tracking-tight">Chats</h1>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
              {CHATS.length} conversations
            </p>
          </div>
          <button className="size-9 rounded-full bg-foreground text-background flex items-center justify-center active:scale-95 transition-transform">
            <Plus className="size-4" strokeWidth={3} />
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full bg-accent border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60 outline-none"
          />
          <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground/60" />
        </div>
      </header>

      {pending && pendingLabel && (
        <div className="mx-5 mt-3 bg-primary text-primary-foreground rounded-2xl p-4 flex items-center gap-3 shadow-lg shadow-primary/25">
          <div className="size-9 rounded-full bg-primary-foreground/15 flex items-center justify-center shrink-0">
            <Lock className="size-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
              Sharing privately
            </p>
            <p className="text-sm font-bold truncate">Pick a chat for "{pendingLabel}"</p>
          </div>
          <button
            onClick={() => clearPendingShare()}
            className="size-8 rounded-full bg-primary-foreground/15 flex items-center justify-center active:scale-90 transition-transform"
            aria-label="Cancel share"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      <main className="px-5 pt-3 pb-32 space-y-1.5">
        {CHATS.map((c, i) => {
          const last = c.messages[c.messages.length - 1];
          const preview = last?.text
            ? last.text
            : last?.share?.kind === "place"
            ? "📍 Shared a place"
            : last?.share?.kind === "list"
            ? "🔖 Shared a bucket list"
            : "🎟️ Shared an event";

          return (
            <button
              key={c.id}
              onClick={() =>
                router.visit(`/chat/${c.id}${pending ? "?share=1" : ""}`)
              }
              className="w-full text-left animate-feed-item bg-card rounded-2xl p-4 ring-1 ring-black/[0.04] flex items-center gap-3 active:scale-[0.99] transition-transform"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {c.isGroup ? (
                <div className="size-12 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 ring-1 ring-primary/20 grid grid-cols-2 gap-0.5 p-1.5">
                  {c.members.slice(0, 4).map((m) => (
                    <div
                      key={m.handle}
                      className="rounded-md bg-background/70 flex items-center justify-center font-bold text-[8px]"
                    >
                      {m.initials}
                    </div>
                  ))}
                </div>
              ) : (
                <Avatar initials={c.members[0].initials} size="lg" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display font-bold text-base truncate">{c.name}</p>
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                    {c.lastTime}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <p className="text-xs text-muted-foreground truncate">
                    {last?.sender === "ME" ? "You: " : ""}
                    {preview}
                  </p>
                  {c.unread > 0 && (
                    <span className="shrink-0 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 min-w-5 h-5 rounded-full flex items-center justify-center">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}

        <Link
          href="/"
          className="block bg-foreground text-background rounded-2xl p-4 mt-4 flex items-center justify-between"
        >
          <div>
            <p className="font-display font-bold text-base">Discover something to share</p>
            <p className="text-xs opacity-70 mt-0.5">Back to your feed</p>
          </div>
          <span className="text-xl">→</span>
        </Link>
      </main>
    </AppShell>
  );
}
