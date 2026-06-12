import { Link } from "@inertiajs/react";
import { Bookmark, Calendar, MapPin } from "lucide-react";
import { PLACES, LISTS, EVENTS, type Share } from "@/lib/mock-data";

export function SharedItemCard({ share, mine }: { share: Share; mine?: boolean }) {
  const ring = mine ? "ring-primary-foreground/20" : "ring-black/[0.05]";
  const bg = mine ? "bg-primary-foreground/10" : "bg-card";

  if (share.kind === "place") {
    const p = PLACES.find((x) => x.id === share.id);
    if (!p) return null;
    return (
      <Link
        href={`/place/${p.id}`}
        className={`block ${bg} rounded-2xl overflow-hidden ring-1 ${ring} w-64`}
      >
        <img src={p.photo} alt={p.name} className="w-full aspect-[4/3] object-cover" loading="lazy" />
        <div className="p-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider opacity-70">
            <MapPin className="size-3" />
            Place · {p.category}
          </div>
          <p className="font-display font-bold text-sm leading-tight mt-1">{p.name}</p>
          <p className="text-[11px] opacity-70 mt-0.5">
            {p.neighborhood} · ★ {p.rating}
          </p>
        </div>
      </Link>
    );
  }

  if (share.kind === "list") {
    const l = LISTS.find((x) => x.id === share.id);
    if (!l) return null;
    return (
      <Link
        href={`/list/${l.id}`}
        className={`block ${bg} rounded-2xl overflow-hidden ring-1 ${ring} w-64 p-3`}
      >
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider opacity-70">
          <Bookmark className="size-3" />
          Bucket list · private to group
        </div>
        <p className="font-display font-bold text-sm leading-tight mt-1">
          {l.name} {l.emoji}
        </p>
        <p className="text-[11px] opacity-70 mt-0.5">
          {l.itemCount} spots · by @{l.creator.handle}
        </p>
        <div className="flex -space-x-2 mt-2.5">
          {l.cover.slice(0, 3).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="size-10 rounded-lg object-cover ring-2 ring-card"
              loading="lazy"
            />
          ))}
        </div>
      </Link>
    );
  }

  const e = EVENTS.find((x) => x.id === share.id);
  if (!e) return null;
  return (
    <Link
      href="/events"
      className={`block ${bg} rounded-2xl overflow-hidden ring-1 ${ring} w-64`}
    >
      <img src={e.photo} alt={e.name} className="w-full aspect-[16/9] object-cover" loading="lazy" />
      <div className="p-3">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider opacity-70">
          <Calendar className="size-3" />
          {e.date} · {e.time}
        </div>
        <p className="font-display font-bold text-sm leading-tight mt-1">{e.name}</p>
        <p className="text-[11px] opacity-70 mt-0.5">
          {e.venue} · {e.price}
        </p>
      </div>
    </Link>
  );
}
