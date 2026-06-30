import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { TopNav } from "./TopNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground font-body">
      <TopNav />
      <div className="w-full flex-1">{children}</div>
      <BottomNav />
    </div>
  );
}
