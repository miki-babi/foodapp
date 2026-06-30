import { Link, Head } from "@inertiajs/react";
import { Plus, Globe, Users, Lock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { LISTS } from "@/lib/mock-data";
import { Avatar } from "@/components/Avatar";

const VIS_ICON = { Public: Globe, Friends: Users, Private: Lock } as const;

export default function ListsPage() {
  const myLists = LISTS;
  const trending = LISTS.filter((l) => l.visibility === "Public");

  return (
    <AppShell>
      <Head>
        <title>Lists — Oasis</title>
      </Head>
      
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl tracking-tight">My bucket lists</h1>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
              {myLists.length} lists · {myLists.reduce((s, l) => s + l.steals, 0)} steals
            </p>
          </div>
          <button className="flex items-center gap-1.5 bg-foreground text-background px-3 py-2 rounded-xl text-xs font-bold active:scale-95 transition-transform">
            <Plus className="size-4" strokeWidth={3} />
            New list
          </button>
        </div>
      </header>

      <main className="px-5 pb-32 lg:pb-8 space-y-8">
        <section className="space-y-3">
          {myLists.map((list, i) => {
            const Icon = VIS_ICON[list.visibility];
            const progress = (list.completed / list.itemCount) * 100;
            return (
              <Link
                key={list.id}
                href={`/list/${list.id}`}
                className="block animate-feed-item bg-card rounded-3xl p-5 ring-1 ring-black/[0.04] shadow-sm active:scale-[0.99] transition-transform"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-xl text-balance leading-tight">
                      {list.name} {list.emoji}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {list.itemCount} spots · {list.completed} done
                    </p>
                  </div>
                  {list.visibility === "Public" && (
                    <div className="bg-primary px-2.5 py-1 rounded-full shrink-0">
                      <p className="text-[10px] font-bold text-primary-foreground uppercase tracking-widest">
                        {list.steals} steals
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="flex -space-x-2">
                    {list.cover.slice(0, 3).map((src, j) => (
                      <img
                        key={j}
                        src={src}
                        alt=""
                        className="size-10 rounded-xl object-cover ring-2 ring-card"
                        loading="lazy"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 bg-accent px-2.5 py-1 rounded-full">
                    <Icon className="size-3 text-muted-foreground" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      {list.visibility}
                    </span>
                  </div>
                </div>

                <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </section>

        <section>
          <h2 className="font-display font-bold text-lg mb-3">Trending lists near you</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
            {trending.map((list) => (
              <Link
                key={list.id}
                href={`/list/${list.id}`}
                className="shrink-0 w-52 bg-card rounded-2xl p-4 ring-1 ring-black/[0.04] shadow-sm"
              >
                <img
                  src={list.cover[0]}
                  alt=""
                  className="w-full aspect-[4/3] rounded-xl object-cover mb-3"
                  loading="lazy"
                />
                <h4 className="font-display font-bold text-sm leading-tight text-balance">
                  {list.name} {list.emoji}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  <Avatar initials={list.creator.initials} size="sm" />
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {list.creator.name}
                  </span>
                </div>
                <div className="mt-2 bg-primary/10 text-primary px-2 py-0.5 rounded-full inline-block">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {list.steals} steals
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Link
          href="/events"
          className="block bg-foreground text-background rounded-2xl p-4 flex items-center justify-between"
        >
          <div>
            <p className="font-display font-bold text-base">Upcoming events</p>
            <p className="text-xs opacity-70 mt-0.5">3 happening this week</p>
          </div>
          <span className="text-xl">→</span>
        </Link>
      </main>
    </AppShell>
  );
}
