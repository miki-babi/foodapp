import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Search, Send, X, Check, Lock } from "lucide-react";
import { toast } from "sonner";
import { CHATS, type Share, type ChatMessage } from "@/lib/mock-data";

export function ShareSheet({
  open,
  onOpenChange,
  share,
  onSent,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  share: Share | null;
  onSent?: (count: number) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      setSelected(new Set());
      setQuery("");
      // Lock body scroll while sheet is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const filtered = useMemo(
    () =>
      CHATS.filter((c) =>
        c.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query]
  );

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function send() {
    if (!share || selected.size === 0) return;
    const stamp = "now";
    selected.forEach((chatId) => {
      const c = CHATS.find((x) => x.id === chatId);
      if (!c) return;
      const msg: ChatMessage = {
        id: `s-${chatId}-${Date.now()}`,
        sender: "ME",
        time: stamp,
        share,
      };
      c.messages.push(msg);
      c.lastTime = stamp;
    });
    const count = selected.size;
    onSent?.(count);
    toast.success(
      count === 1
        ? `Shared to ${CHATS.find((c) => c.id === [...selected][0])?.name}`
        : `Shared to ${count} chats`
    );
    onOpenChange(false);
  }

  if (!open) return null;

  // Portal renders outside any transformed/overflow-hidden ancestor
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end lg:items-center justify-center">
      {/* Backdrop */}
      <button
        aria-label="Close share sheet"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Sheet */}
      <div
        className="relative w-full lg:max-w-lg bg-background rounded-t-3xl lg:rounded-2xl shadow-2xl max-h-[80vh] lg:max-h-[70vh] flex flex-col"
        style={{ animation: "slideUp 0.25s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        {/* Handle */}
        <div className="pt-2 pb-1 flex justify-center">
          <div className="h-1.5 w-10 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Header */}
        <div className="px-5 pt-2 pb-3 flex items-center justify-between border-b border-border">
          <div>
            <p className="font-display font-bold text-lg">Share to chats</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1 mt-0.5">
              <Lock className="size-2.5" />
              Private to selected chats
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="size-9 rounded-full bg-accent flex items-center justify-center"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pt-3 pb-2">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chats..."
              className="w-full bg-accent border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Search className="absolute left-3.5 top-3 size-4 text-muted-foreground/60" />
          </div>
        </div>

        {/* Chat list */}
        <div className="overflow-y-auto px-2 pb-4 flex-1">
          {filtered.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">
              No chats match "{query}"
            </p>
          )}
          {filtered.map((c) => {
            const checked = selected.has(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-colors ${
                  checked ? "bg-primary/10" : "hover:bg-accent"
                }`}
              >
                {c.isGroup ? (
                  <div className="size-11 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 ring-1 ring-primary/20 grid grid-cols-2 gap-0.5 p-1 shrink-0">
                    {c.members.slice(0, 4).map((m) => (
                      <div
                        key={m.handle}
                        className="rounded-sm bg-background/70 flex items-center justify-center font-bold text-[7px]"
                      >
                        {m.initials}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="size-11 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 ring-1 ring-primary/20 flex items-center justify-center font-bold text-xs shrink-0">
                    {c.members[0].initials}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-sm truncate">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {c.isGroup ? `${c.members.length} members` : "Direct message"}
                  </p>
                </div>
                <div
                  className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    checked
                      ? "bg-primary border-primary"
                      : "border-border bg-background"
                  }`}
                >
                  {checked && (
                    <Check className="size-3.5 text-primary-foreground" strokeWidth={3} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Send button */}
        <div className="p-4 pb-8 border-t border-border bg-background">
          <button
            onClick={send}
            disabled={selected.size === 0}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-40 disabled:shadow-none active:scale-[0.98] transition-transform"
          >
            <Send className="size-4" strokeWidth={2.5} />
            {selected.size === 0
              ? "Pick chats to send"
              : `Send to ${selected.size} ${selected.size === 1 ? "chat" : "chats"}`}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
