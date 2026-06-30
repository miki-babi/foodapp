import { router, Head } from "@inertiajs/react";
import { useState } from "react";
import { ArrowLeft, Camera, MapPin } from "lucide-react";
import { AppShell } from "@/components/AppShell";

const TABS = ["Restaurant", "Event", "Place"] as const;
const CATEGORIES = ["Traditional", "Cafe", "Bar", "Rooftop", "Street food", "Art"];
const PRICES = ["$", "$$", "$$$", "$$$$"];

export default function AddPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Restaurant");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState(PRICES[1]);
  const [rsvpGroup, setRsvpGroup] = useState(true);

  return (
    <AppShell>
      <Head>
        <title>Add a place — Oasis</title>
      </Head>
      
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md px-5 pt-6 pb-4 flex items-center gap-3">
        <button
          onClick={() => router.visit("/")}
          className="size-9 rounded-full bg-accent flex items-center justify-center"
        >
          <ArrowLeft className="size-4" />
        </button>
        <h1 className="font-display font-bold text-xl">Share a find</h1>
      </header>

      <main className="px-5 pb-32 lg:pb-8 space-y-5">
        {/* Type selector */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-accent rounded-2xl">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === t
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Photo upload */}
        <div>
          <Label>Photos</Label>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                className="aspect-square rounded-2xl border-2 border-dashed border-border bg-accent/40 flex flex-col items-center justify-center text-muted-foreground gap-1 active:scale-95 transition-transform"
              >
                <Camera className="size-5" />
                <span className="text-[10px] font-bold uppercase tracking-tight">Add</span>
              </button>
            ))}
          </div>
        </div>

        {/* Common fields */}
        <Field label="Name" placeholder={tab === "Event" ? "Event name" : "Place name"} />

        {tab !== "Event" && (
          <div>
            <Label>Category</Label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    category === c
                      ? "bg-foreground text-background"
                      : "bg-accent text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "Event" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date" placeholder="Pick a date" />
              <Field label="Time" placeholder="Pick a time" />
            </div>
            <Field label="Ticket price" placeholder="e.g. 300 ETB or Free" />
          </>
        )}

        {/* Location */}
        <div>
          <Label>{tab === "Event" ? "Venue" : "Location"}</Label>
          <div className="bg-accent rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-card flex items-center justify-center">
              <MapPin className="size-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">Kazanchis, Addis Ababa</p>
              <p className="text-xs text-muted-foreground">Tap to adjust pin</p>
            </div>
          </div>
        </div>

        <TextArea
          label={tab === "Event" ? "Description" : "Your review"}
          placeholder={tab === "Event" ? "What's this about?" : "What made it special?"}
        />

        {tab === "Restaurant" && (
          <div>
            <Label>Price range</Label>
            <div className="grid grid-cols-4 gap-2">
              {PRICES.map((p) => (
                <button
                  key={p}
                  onClick={() => setPrice(p)}
                  className={`py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    price === p
                      ? "bg-foreground text-background"
                      : "bg-accent text-muted-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "Event" && (
          <label className="flex items-center justify-between bg-accent rounded-2xl p-4">
            <div>
              <p className="text-sm font-bold">Allow group RSVP</p>
              <p className="text-xs text-muted-foreground">Let attendees meet up</p>
            </div>
            <button
              onClick={() => setRsvpGroup((v) => !v)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                rsvpGroup ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 size-5 bg-card rounded-full shadow transition-transform ${
                  rsvpGroup ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </label>
        )}

        <button className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold shadow-lg shadow-primary/25 active:scale-[0.98] transition-all">
          Post listing
        </button>
      </main>
    </AppShell>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
      {children}
    </label>
  );
}

function Field({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-accent border-none rounded-2xl py-3 px-4 text-sm placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function TextArea({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="w-full bg-accent border-none rounded-2xl py-3 px-4 text-sm placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/20 resize-none"
      />
    </div>
  );
}
