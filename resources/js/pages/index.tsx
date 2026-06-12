import { Link, Head } from "@inertiajs/react";
import { useState } from "react";
import { Bell, Search, Heart, Bookmark, Plus, Download, Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ShareSheet } from "@/components/ShareSheet";
import { PLACES, LISTS, ME, type Share } from "@/lib/mock-data";
import { Avatar } from "@/components/Avatar";

const FILTERS = ["All", "Food", "Events", "Hidden Gems", "Trending", "Near Me"];

export default function HomePage() {
  const place = PLACES[0];
  const place2 = PLACES[1];
  const list = LISTS[0];

  return (
    <AppShell>
      <Head title="Oasis — Discover your city">
        <meta head-key="description" name="description" content="Your social city discovery feed: places, events, and bucket lists from friends." />
      </Head>
      
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md px-5 pt-6 pb-2">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="font-display font-bold text-2xl tracking-tight">
              Morning, {ME.name.split(" ")[0]}
            </h1>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Discovery Feed
            </p>
          </div>
          <Link
            href="/notifications"
            className="relative p-2 rounded-full bg-accent hover:bg-primary/10 transition-colors"
          >
            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full ring-2 ring-background" />
            <Bell className="size-5" />
          </Link>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search places, events, people..."
            className="w-full bg-accent border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60 outline-none"
          />
          <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground/60" />
        </div>

        <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar -mx-5 px-5">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                i === 0
                  ? "bg-foreground text-background"
                  : "bg-accent text-muted-foreground hover:bg-primary/10 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <main className="px-5 pb-32 space-y-6">
        <PlaceCard place={place} />
        <ListCard list={list} />
        <PlaceCard place={place2} delay={300} />
      </main>
    </AppShell>
  );
}

function PlaceCard({ place, delay = 0 }: { place: typeof PLACES[number]; delay?: number }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [shareCount, setShareCount] = useState(place.shares ?? Math.floor(place.likes / 4));
  const share: Share = { kind: "place", id: place.id };

  return (
    <article
      className="animate-feed-item bg-card rounded-3xl overflow-hidden ring-1 ring-black/[0.04] shadow-sm"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar initials={place.poster.initials} />
          <div>
            <p className="font-semibold text-sm">{place.poster.name}</p>
            <p className="text-xs text-muted-foreground font-mono">{place.postedAt}</p>
          </div>
        </div>
        <button className="text-muted-foreground px-2">•••</button>
      </div>

      <Link href={`/place/${place.id}`}>
        <img
          src={place.photo}
          alt={place.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full aspect-square object-cover"
        />
      </Link>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-3">
          <Link href={`/place/${place.id}`} className="flex-1">
            <h3 className="font-display font-bold text-xl">{place.name}</h3>
          </Link>
          <div className="flex items-center bg-primary/10 px-2 py-0.5 rounded-lg shrink-0">
            <span className="text-primary font-bold text-sm">{place.rating}</span>
            <svg className="size-3 text-primary ml-1 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed text-pretty">{place.caption}</p>

        <div className="flex gap-2 flex-wrap">
          {place.tags.map((t) => (
            <span
              key={t}
              className="bg-accent text-muted-foreground px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="pt-2 flex justify-between items-center">
          <div className="flex gap-4">
            <button className="flex items-center gap-1.5 group">
              <Heart className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs font-mono text-muted-foreground">{place.likes}</span>
            </button>
            <button className="flex items-center gap-1.5 group">
              <Bookmark className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
            <button
              onClick={() => setShareOpen(true)}
              className="flex items-center gap-1.5 group"
              aria-label="Share"
            >
              <Send className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs font-mono text-muted-foreground">{shareCount}</span>
            </button>
          </div>
          <button className="flex items-center gap-1.5 bg-accent/50 px-3 py-2 rounded-xl active:scale-95 transition-transform">
            <Plus className="size-4 text-muted-foreground" />
            <span className="text-xs font-semibold">Add to list</span>
          </button>
        </div>
      </div>

      <ShareSheet
        open={shareOpen}
        onOpenChange={setShareOpen}
        share={share}
        onSent={(n) => setShareCount((c) => c + n)}
      />
    </article>
  );
}

function ListCard({ list }: { list: typeof LISTS[number] }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [shareCount, setShareCount] = useState(list.shares ?? Math.floor(list.steals / 2));
  const share: Share = { kind: "list", id: list.id };

  return (
    <article className="animate-feed-item [animation-delay:150ms] bg-background border-2 border-primary/20 rounded-3xl p-5 relative overflow-hidden">
      <div className="absolute -right-4 -top-4 size-24 bg-primary/5 rounded-full blur-2xl" />

      <div className="flex items-center gap-3 mb-4">
        <Avatar initials={list.creator.initials} size="sm" />
        <p className="text-xs font-medium">
          <span className="font-bold">{list.creator.name}</span> curated a list
        </p>
      </div>

      <div className="flex justify-between items-start mb-6 gap-3">
        <Link href={`/list/${list.id}`} className="flex-1">
          <h3 className="font-display font-bold text-2xl text-balance leading-tight">
            {list.name} {list.emoji}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{list.description}</p>
        </Link>
        <div className="bg-primary px-3 py-1 rounded-full shadow-lg shadow-primary/20 shrink-0">
          <p className="text-[10px] font-bold text-primary-foreground uppercase tracking-widest">
            {list.steals} Steals
          </p>
        </div>
      </div>

      <div className="flex -space-x-3 mb-6">
        {list.cover.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="size-12 rounded-2xl object-cover ring-4 ring-background"
          />
        ))}
        <div className="size-12 rounded-2xl bg-accent ring-4 ring-background flex items-center justify-center font-bold text-muted-foreground text-xs">
          +{list.itemCount - list.cover.length}
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/list/${list.id}`}
          className="flex-1 bg-primary py-4 rounded-2xl font-bold text-primary-foreground flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-[0.98] transition-all"
        >
          <Download className="size-5" strokeWidth={2.5} />
          Steal this list
        </Link>
        <button
          onClick={() => setShareOpen(true)}
          className="px-4 bg-accent rounded-2xl font-bold flex items-center gap-1.5 active:scale-[0.98] transition-all"
          aria-label="Share list"
        >
          <Send className="size-4" />
          <span className="text-xs font-mono">{shareCount}</span>
        </button>
      </div>

      <ShareSheet
        open={shareOpen}
        onOpenChange={setShareOpen}
        share={share}
        onSent={(n) => setShareCount((c) => c + n)}
      />
    </article>
  );
}


