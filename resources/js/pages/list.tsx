import { Link, router, Head } from "@inertiajs/react";
import { useState } from "react";
import { ArrowLeft, Camera, Share2, Download, Pencil, ChevronDown, ChevronUp } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ShareSheet } from "@/components/ShareSheet";
import { LISTS, PLACES, type BucketList } from "@/lib/mock-data";
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isMine = initial.creator.handle === "me";

  const completed = items.filter((i) => i.done).length;

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

      <main className="px-5 pb-32 lg:pb-8">
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

        {/* Featured Gallery */}
        {initial.cover && initial.cover.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-4 mb-4 snap-x no-scrollbar -mx-5 px-5">
            {initial.cover.map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt="Cover gallery" 
                className="h-48 w-40 object-cover rounded-2xl shrink-0 snap-center shadow-sm" 
              />
            ))}
          </div>
        )}

        <ul className="space-y-3">
          {items.map((item, index) => {
            const place = item.placeId ? PLACES.find(p => p.id === item.placeId) : null;
            const isExpanded = expandedId === item.id;
            
            return (
            <li
              key={item.id}
              className="bg-card rounded-2xl ring-1 ring-black/[0.04] overflow-hidden transition-all duration-300 shadow-sm"
            >
              <div 
                className="flex items-center gap-3 p-4 cursor-pointer active:bg-accent/50"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <div className="size-7 rounded-full bg-accent shrink-0 flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {index + 1}
                </div>
                
                <span className="flex-1 text-sm font-semibold">
                  {item.name}
                </span>

                <div className="text-muted-foreground">
                  {isExpanded ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
                </div>
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-border/50 animate-in fade-in slide-in-from-top-2">
                  {place ? (
                    <div className="flex gap-4 items-start mt-3">
                      <img 
                        src={place.photo} 
                        alt={place.name} 
                        className="size-20 rounded-xl object-cover shadow-sm shrink-0" 
                      />
                      <div className="flex flex-col gap-1">
                        <Link href={`/place/${place.id}`} className="font-semibold text-sm hover:underline">
                          {place.name}
                        </Link>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="inline-block size-1.5 rounded-full bg-primary/50"></span>
                          {place.neighborhood} • {place.category}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs font-medium bg-accent px-2 py-0.5 rounded-md">
                            {place.rating} ★
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-muted-foreground italic px-2">
                      More details coming soon...
                    </div>
                  )}
                </div>
              )}
            </li>
          )})}
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

