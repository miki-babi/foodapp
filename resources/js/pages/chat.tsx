import { Link, router, Head } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Lock, Send, Smile, Plus, Image as ImgIcon } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { SharedItemCard } from "@/components/SharedItemCard";
import { CHATS, type Chat, type ChatMessage } from "@/lib/mock-data";
import { Avatar } from "@/components/Avatar";
import { clearPendingShare, getPendingShare } from "@/lib/share-store";

export default function ChatPage({ id }: { id: string }) {
  const chat = CHATS.find((x) => x.id === id);

  if (!chat) {
    return (
      <AppShell>
        <div className="p-10 text-center">
          <h2 className="font-display font-bold text-xl">Chat not found</h2>
        </div>
      </AppShell>
    );
  }

  const [messages, setMessages] = useState<ChatMessage[]>(chat.messages);
  const [draft, setDraft] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);

  // consume pending share once on mount when ?share=1
  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const hasShare = searchParams.get("share") === "1";
    if (!hasShare) return;

    const pending = getPendingShare();
    if (!pending) return;
    
    setMessages((prev) => [
      ...prev,
      {
        id: `s-${Date.now()}`,
        sender: "ME",
        time: "now",
        share: pending,
      },
    ]);
    clearPendingShare();
    window.history.replaceState({}, '', `/chat/${chat.id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  function send() {
    const t = draft.trim();
    if (!t) return;
    setMessages((prev) => [
      ...prev,
      { id: `t-${Date.now()}`, sender: "ME", time: "now", text: t },
    ]);
    setDraft("");
  }

  return (
    <AppShell>
      <Head>
        <title>{chat ? `${chat.name} — Oasis chat` : "Chat — Oasis"}</title>
      </Head>
      
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-md px-4 pt-6 pb-3 border-b border-border flex items-center gap-3">
        <button
          onClick={() => router.visit("/chats")}
          className="size-9 rounded-full bg-accent flex items-center justify-center"
        >
          <ArrowLeft className="size-4" />
        </button>
        {chat.isGroup ? (
          <div className="size-10 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 ring-1 ring-primary/20 grid grid-cols-2 gap-0.5 p-1">
            {chat.members.slice(0, 4).map((m) => (
              <div
                key={m.handle}
                className="rounded-sm bg-background/70 flex items-center justify-center font-bold text-[7px]"
              >
                {m.initials}
              </div>
            ))}
          </div>
        ) : (
          <Avatar initials={chat.members[0].initials} size="md" />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-base truncate">{chat.name}</p>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1">
            <Lock className="size-2.5" />
            {chat.isGroup
              ? `${chat.members.length} members · shared lists private`
              : "Direct message"}
          </p>
        </div>
      </header>

      <div
        ref={scrollerRef}
        className="px-4 pt-4 pb-40 space-y-3 overflow-y-auto"
        style={{ minHeight: "calc(100vh - 200px)" }}
      >
        {messages.map((m, i) => {
          const mine = m.sender === "ME";
          const prev = messages[i - 1];
          const showSender = chat.isGroup && !mine && prev?.sender !== m.sender;
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[78%] ${mine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                {showSender && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-3">
                    {m.senderName ?? m.sender}
                  </span>
                )}
                {m.share && (
                  <div className={mine ? "" : ""}>
                    <SharedItemCard share={m.share} mine={mine} />
                  </div>
                )}
                {m.text && (
                  <div
                    className={`px-3.5 py-2 rounded-2xl text-sm leading-snug ${
                      mine
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card ring-1 ring-black/[0.05] text-foreground rounded-bl-md"
                    }`}
                  >
                    {m.text}
                  </div>
                )}
                <span
                  className={`text-[10px] font-mono text-muted-foreground ${
                    mine ? "mr-2" : "ml-2"
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Composer */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 pb-24 lg:pb-4 z-40">
        <div className="flex items-end gap-2">
          <Link
            href="/"
            className="size-10 rounded-full bg-accent flex items-center justify-center shrink-0"
            title="Share something from your feed"
          >
            <Plus className="size-5 text-muted-foreground" />
          </Link>
          <div className="flex-1 bg-accent rounded-2xl px-4 py-2.5 flex items-center gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Message..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
            <button className="text-muted-foreground">
              <Smile className="size-4" />
            </button>
            <button className="text-muted-foreground">
              <ImgIcon className="size-4" />
            </button>
          </div>
          <button
            onClick={send}
            disabled={!draft.trim()}
            className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/25 disabled:opacity-40 active:scale-95 transition-transform shrink-0"
          >
            <Send className="size-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
