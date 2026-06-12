import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[430px] mx-auto bg-background text-foreground font-body min-h-screen relative shadow-2xl overflow-hidden">
      {children}
      <BottomNav />
    </div>
  );
}
