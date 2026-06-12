import React from "react";

export function Avatar({
  initials,
  size = "md",
}: {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizes = {
    sm: "size-8 text-[10px]",
    md: "size-10 text-xs",
    lg: "size-14 text-sm",
    xl: "size-20 text-xl",
  };
  return (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br from-primary/30 to-primary/10 ring-1 ring-primary/20 flex items-center justify-center font-bold text-foreground`}
    >
      {initials}
    </div>
  );
}
