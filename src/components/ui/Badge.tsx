import type { ReactNode } from "react";

type BadgeVariant =
  | "available"
  | "sold"
  | "commission"
  | "reserved"
  | "processing"
  | "shipped"
  | "delivered"
  | "pending";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  available: "bg-success/15 text-success",
  sold: "bg-accent/15 text-accent",
  commission: "bg-secondary/15 text-secondary",
  reserved: "bg-section text-body",
  processing: "bg-amber-soft text-amber",
  shipped: "bg-secondary/15 text-secondary",
  delivered: "bg-success/15 text-success",
  pending: "bg-section text-muted",
};

export default function Badge({ variant = "pending", className = "", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-medium rounded-full whitespace-nowrap ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
