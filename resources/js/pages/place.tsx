import { router, Head } from "@inertiajs/react";
import { useState } from "react";
import { ArrowLeft, MapPin, Bookmark, Plus, Navigation, Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ShareSheet } from "@/components/ShareSheet";
import { PLACES } from "@/lib/mock-data";
import { Avatar } from "@/components/Avatar";

export default function PlacePage({ id }: { id: string }) {
  const place = PLACES.find((p) => p.id === id);

  if (!place) {
    return (
      <AppShell>
        <div className="p-10 text-center">
          <h2 className="font-display font-bold text-xl">Place not found</h2>
        </div>
      </AppShell>
    );
  }

  const [shareOpen, setShareOpen] = useState(false);
  const [shareCount, setShareCount] = useState<number>(place.shares ?? Math.floor(place.likes / 4));

  return (
    <AppShell>
      <Head>
        <title>{place ? `${place.name} — Oasis` : "Place — Oasis"}</title>
        <meta name="description" content={place?.caption ?? "Place detail on Oasis"} />
      </Head>
      
      <div className="relative">
        <img
          src={place.photo}
          alt={place.name}
          className="w-full aspect-[4/3] object-cover"
        />
        <button
          onClick={() => router.visit("/")}
          className="absolute top-6 left-5 size-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center shadow"
        >
          <ArrowLeft className="size-5" />
        </button>
      </div>

      <main className="px-5 pb-32 lg:pb-8 -mt-6 relative space-y-6">
        <div className="bg-card rounded-3xl p-5 ring-1 ring-black/[0.04] shadow-sm">
          <h1 className="font-display font-bold text-3xl text-balance leading-tight">
            {place.name}
          </h1>
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground flex-wrap">
            <span>{place.neighborhood}</span>
            <span>·</span>
            <span>{place.category}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <span className={`size-2 rounded-full ${place.open ? "bg-emerald-500" : "bg-rose-500"}`} />
              {place.open ? "Open now" : "Closed"}
            </span>
            <span>·</span>
            <span className="text-primary font-bold">★ {place.rating}</span>
            <span className="text-muted-foreground">({place.reviews})</span>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <Avatar initials={place.poster.initials} size="sm" />
            <div>
              <p className="text-xs font-bold">{place.poster.name}</p>
              <p className="text-[10px] text-muted-foreground font-mono">{place.postedAt}</p>
            </div>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed mt-3">
            {place.caption}{" "}
            <button className="text-primary font-bold">read more</button>
          </p>
        </div>

        <section>
          <h2 className="font-display font-bold text-lg mb-3">Photos</h2>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">
            {[place.photo, place.photo, place.photo, place.photo].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="size-24 shrink-0 rounded-xl object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-3 gap-3">
          <button className="bg-accent text-foreground py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform">
            <Bookmark className="size-4" />
            Save
          </button>
          <button
            onClick={() => setShareOpen(true)}
            className="bg-foreground text-background py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
          >
            <Send className="size-4" />
            Share · {shareCount}
          </button>
          <button className="bg-primary text-primary-foreground py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform">
            <Plus className="size-4" strokeWidth={3} />
            To list
          </button>
        </div>

        <section>
          <h2 className="font-display font-bold text-lg mb-3">Reviews</h2>
          <div className="space-y-3">
            {[
              { name: "Yonas M.", initials: "YM", rating: 5, text: "The cortado, the silence, the books. 10/10." },
              { name: "Sara B.", initials: "SB", rating: 4, text: "Lovely vibe but gets packed on weekends." },
            ].map((r, i) => (
              <div key={i} className="bg-card rounded-2xl p-4 ring-1 ring-black/[0.04]">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar initials={r.initials} size="sm" />
                  <div className="flex-1">
                    <p className="text-xs font-bold">{r.name}</p>
                    <p className="text-[10px] text-primary font-bold">{"★".repeat(r.rating)}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card rounded-3xl overflow-hidden ring-1 ring-black/[0.04]">
          <div className="h-32 bg-gradient-to-br from-primary/20 via-accent to-primary/10 flex items-center justify-center">
            <MapPin className="size-8 text-primary" />
          </div>
          <button className="w-full p-4 flex items-center justify-between">
            <span className="text-sm font-bold">{place.neighborhood}, Addis Ababa</span>
            <span className="flex items-center gap-1.5 text-primary text-xs font-bold">
              <Navigation className="size-3.5" />
              Get directions
            </span>
          </button>
        </section>
      </main>

      <ShareSheet
        open={shareOpen}
        onOpenChange={setShareOpen}
        share={{ kind: "place", id: place.id }}
        onSent={(n) => setShareCount((c) => c + n)}
      />
    </AppShell>
  );
}
