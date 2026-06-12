import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Settings, Share2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ME, PLACES, LISTS } from "@/lib/mock-data";
import { Avatar } from "@/components/Avatar";

const TABS = ["Posts", "Lists", "Completed"] as const;

export default function MePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Posts");
  const completedItems = LISTS.flatMap((l) =>
    l.items.filter((i) => i.done).map((i) => ({ ...i, list: l }))
  );

  return (
    <AppShell>
      <Head title={`${ME.name} — Oasis`} />
      
      <header className="px-5 pt-6 pb-4 flex justify-between items-start">
        <div />
        <div className="flex gap-2">
          <button className="size-9 rounded-full bg-accent flex items-center justify-center">
            <Share2 className="size-4" />
          </button>
          <button className="size-9 rounded-full bg-accent flex items-center justify-center">
            <Settings className="size-4" />
          </button>
        </div>
      </header>

      <main className="px-5 pb-32">
        <div className="flex flex-col items-center text-center mb-6">
          <Avatar initials={ME.initials} size="xl" />
          <h1 className="font-display font-bold text-2xl mt-3">{ME.name}</h1>
          <p className="text-sm text-muted-foreground font-mono">
            @{ME.handle} · {ME.city}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 bg-card rounded-2xl p-4 ring-1 ring-black/[0.04] mb-6">
          <Stat label="Listed" value={ME.stats.listed} />
          <Stat label="Lists" value={ME.stats.lists} />
          <Stat label="Steals" value={ME.stats.steals} />
          <Stat label="Followers" value={ME.stats.followers} />
        </div>

        <div className="flex gap-1 p-1 bg-accent rounded-2xl mb-4">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                tab === t ? "bg-card shadow-sm" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Posts" && (
          <div className="grid grid-cols-3 gap-1">
            {PLACES.map((p) => (
              <img
                key={p.id}
                src={p.photo}
                alt={p.name}
                className="aspect-square object-cover rounded-md"
                loading="lazy"
              />
            ))}
          </div>
        )}

        {tab === "Lists" && (
          <div className="space-y-3">
            {LISTS.map((l) => (
              <div key={l.id} className="bg-card rounded-2xl p-4 ring-1 ring-black/[0.04]">
                <div className="flex justify-between">
                  <h4 className="font-display font-bold">
                    {l.name} {l.emoji}
                  </h4>
                  {l.visibility === "Public" && (
                    <span className="text-[10px] font-bold text-primary">{l.steals} steals</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{l.itemCount} spots</p>
              </div>
            ))}
          </div>
        )}

        {tab === "Completed" && (
          <div className="grid grid-cols-2 gap-2">
            {completedItems.map((i) => (
              <div key={`${i.list.id}-${i.id}`} className="bg-card rounded-2xl overflow-hidden ring-1 ring-black/[0.04]">
                <img
                  src={i.list.cover[0]}
                  alt=""
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
                <div className="p-3">
                  <p className="text-xs font-bold leading-tight">{i.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{i.list.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="font-display font-bold text-xl">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
