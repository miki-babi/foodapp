import { router, Head } from "@inertiajs/react";
import { useState } from "react";
import { MapPin, ChevronRight, Check } from "lucide-react";
import { INTERESTS, SUGGESTED_FRIENDS } from "@/lib/mock-data";
import { AppShell } from "@/components/AppShell";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const screens = [
    <Splash key="0" onNext={() => setStep(1)} />,
    <Interests key="1" onNext={() => setStep(2)} />,
    <Location key="2" onNext={() => setStep(3)} />,
    <Friends key="3" onDone={() => router.visit("/")} />
  ];

  return (
    <AppShell>
      <Head title="Welcome to Oasis" />
      <div className="min-h-screen flex flex-col px-6 py-10 pb-32 lg:pb-8">
        {step > 0 && (
          <div className="flex justify-center gap-1.5 mb-6">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? "bg-primary w-8" : "bg-accent w-1.5"
                }`}
              />
            ))}
          </div>
        )}
        {screens[step]}
      </div>
    </AppShell>
  );
}

function Splash({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <div className="size-16 rounded-3xl bg-primary flex items-center justify-center mb-6 shadow-xl shadow-primary/25">
        <span className="font-display font-bold text-3xl text-primary-foreground">O</span>
      </div>
      <h1 className="font-display font-bold text-4xl">Oasis</h1>
      <p className="text-muted-foreground mt-2">Discover your city together.</p>

      <div className="w-full space-y-3 mt-12">
        <button
          onClick={onNext}
          className="w-full bg-foreground text-background py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
        >
          <span className="text-lg">G</span>
          Continue with Google
        </button>
        <button
          onClick={onNext}
          className="w-full bg-foreground text-background py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
        >
          <span className="text-lg"></span>
          Continue with Apple
        </button>
        <p className="text-center text-xs text-muted-foreground pt-4">
          Already have an account?{" "}
          <button onClick={onNext} className="text-primary font-bold">Sign in</button>
        </p>
      </div>
    </div>
  );
}

function Interests({ onNext }: { onNext: () => void }) {
  const [picked, setPicked] = useState<string[]>([]);
  const ok = picked.length >= 3;
  return (
    <>
      <h2 className="font-display font-bold text-3xl text-balance">What are you into?</h2>
      <p className="text-muted-foreground mt-2">Pick at least 3.</p>

      <div className="grid grid-cols-3 gap-2 mt-8 flex-1">
        {INTERESTS.map((i) => {
          const active = picked.includes(i.id);
          return (
            <button
              key={i.id}
              onClick={() =>
                setPicked((prev) =>
                  prev.includes(i.id) ? prev.filter((x) => x !== i.id) : [...prev, i.id]
                )
              }
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
                active
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-accent text-foreground"
              }`}
            >
              <span className="text-2xl">{i.emoji}</span>
              <span className="text-xs font-bold">{i.label}</span>
            </button>
          );
        })}
      </div>

      <button
        disabled={!ok}
        onClick={onNext}
        className="w-full mt-6 bg-primary text-primary-foreground py-4 rounded-2xl font-bold disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next ({picked.length}/3)
      </button>
    </>
  );
}

function Location({ onNext }: { onNext: () => void }) {
  return (
    <>
      <div className="h-64 rounded-3xl bg-gradient-to-br from-primary/20 via-accent to-primary/10 mb-6 flex items-center justify-center relative overflow-hidden">
        <MapPin className="size-12 text-primary" strokeWidth={2.5} />
        <span className="absolute size-20 rounded-full bg-primary/20 animate-ping" />
      </div>
      <h2 className="font-display font-bold text-3xl text-balance">We found you in</h2>
      <p className="font-display font-bold text-2xl text-primary mt-1">Addis Ababa, Ethiopia</p>
      <p className="text-muted-foreground mt-3 text-sm">
        We use your location to show you what's nearby. We never share it.
      </p>

      <div className="flex-1" />

      <div className="space-y-3">
        <button
          onClick={onNext}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold"
        >
          Allow location access
        </button>
        <button
          onClick={onNext}
          className="w-full text-muted-foreground py-3 rounded-2xl font-bold text-sm"
        >
          Skip for now
        </button>
      </div>
    </>
  );
}

function Friends({ onDone }: { onDone: () => void }) {
  const [followed, setFollowed] = useState<string[]>([]);
  return (
    <>
      <h2 className="font-display font-bold text-3xl text-balance">Find your people</h2>
      <p className="text-muted-foreground mt-2">Follow a few to start your feed.</p>

      <div className="space-y-2 mt-6 flex-1">
        {SUGGESTED_FRIENDS.map((f) => {
          const active = followed.includes(f.name);
          return (
            <div
              key={f.name}
              className="flex items-center gap-3 bg-card rounded-2xl p-3 ring-1 ring-black/[0.04]"
            >
              <div className="size-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center font-bold">
                {f.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{f.name}</p>
                <p className="text-xs text-muted-foreground">{f.proof}</p>
              </div>
              <button
                onClick={() =>
                  setFollowed((prev) =>
                    prev.includes(f.name) ? prev.filter((x) => x !== f.name) : [...prev, f.name]
                  )
                }
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                  active
                    ? "bg-accent text-muted-foreground"
                    : "bg-foreground text-background"
                }`}
              >
                {active ? <><Check className="size-3" />Following</> : "Follow"}
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={onDone}
        className="w-full mt-6 bg-primary text-primary-foreground py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
      >
        Done — take me in
        <ChevronRight className="size-5" strokeWidth={3} />
      </button>
    </>
  );
}
