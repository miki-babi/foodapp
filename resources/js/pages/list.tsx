import { Link, router, Head } from "@inertiajs/react";
import { useState } from "react";
import { ArrowLeft, Camera, Share2, Download, Pencil } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ShareSheet } from "@/components/ShareSheet";
import { LISTS, type BucketList } from "@/lib/mock-data";
import { Avatar } from "@/components/Avatar";

export default function ListPage({ id }: { id: string }) {
  const initial = LISTS.find((l) => l.id === id);

  if (!initial) {
    return (
      <AppShell>
        <div className="p-10 text-center">
          <h2 className="font-display font-bold text-xl">List not found</h2>
        </div>
      </AppShell>
    );
  }

  const [items, setItems] = useState<BucketList["items"]>(initial.items);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareCount, setShareCount] = useState<number>(initial.shares ?? Math.floor(initial.steals / 2));
  const isMine = initial.creator.handle === "me";

  const sorted = [...items].sort((a, b) => Number(a.done) - Number(b.done));
  const completed = items.filter((i) => i.done).length;

  function toggle(id: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  }

  return (
    <AppShell>
      <Head>
        <title>{initial ? `${initial.name} — Oasis` : "List — Oasis"}</title>
        <meta name="description" content={initial?.description ?? "Bucket list on Oasis"} />
      </Head>
      
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md px-5 pt-6 pb-4 flex items-center justify-between">
        <button
          onClick={() => router.visit("/lists")}
          className="size-9 rounded-full bg-accent flex items-center justify-center"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          onClick={() => setShareOpen(true)}
          className="h-9 px-3 rounded-full bg-foreground text-background flex items-center gap-1.5 text-xs font-bold active:scale-95 transition-transform"
        >
          <Share2 className="size-3.5" />
          Share · {shareCount}
        </button>
      </header>

      <main className="px-5 pb-32">
        <div className="mb-2 flex items-center gap-2">
          {!isMine && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Inspired by @{initial.creator.handle}
            </span>
          )}
        </div>
        <div className="flex items-start gap-2">
          <h1 className="font-display font-bold text-3xl text-balance leading-tight flex-1">
            {initial.name} {initial.emoji}
          </h1>
          {isMine && (
            <button className="size-9 rounded-full bg-accent flex items-center justify-center">
              <Pencil className="size-4" />
            </button>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{initial.description}</p>

        <div className="flex gap-4 mt-4 mb-6 text-xs">
          <Stat label="items" value={initial.itemCount} />
          <Stat label="done" value={completed} />
          <Stat label="steals" value={initial.steals} />
        </div>

        {!isMine ? (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="bg-primary text-primary-foreground py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-[0.98]">
              <Download className="size-4" strokeWidth={3} />
              Steal whole list
            </button>
            <button className="bg-accent text-foreground py-3.5 rounded-2xl font-bold text-sm active:scale-[0.98]">
              Pick items
            </button>
          </div>
        ) : null}

        <ul className="space-y-2">
          {sorted.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 bg-card rounded-2xl p-4 ring-1 ring-black/[0.04]"
            >
              <button
                onClick={() => toggle(item.id)}
                className={`size-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                  item.done
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-border bg-card"
                }`}
              >
                {item.done && (
                  <svg
                    className="size-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              {item.placeId ? (
                <Link
                  href={`/place/${item.placeId}`}
                  className={`flex-1 text-sm font-semibold ${
                    item.done ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className={`flex-1 text-sm font-semibold ${
                    item.done ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {item.name}
                </span>
              )}
              <button className="size-8 rounded-lg bg-accent flex items-center justify-center text-muted-foreground">
                <Camera className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      </main>

      <ShareSheet
        open={shareOpen}
        onOpenChange={setShareOpen}
        share={{ kind: "list", id: initial.id }}
        onSent={(n) => setShareCount((c) => c + n)}
      />
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-accent px-3 py-2 rounded-xl">
      <span className="font-display font-bold text-base mr-1.5">{value}</span>
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
