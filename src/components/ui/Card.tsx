import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddingClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  hover = false,
  padding = "md",
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={`bg-card border border-border rounded-2xl ${paddingClasses[padding]} ${
        hover
          ? "hover:border-accent hover:-translate-y-0.5 hover:shadow-soft transition-all duration-200"
          : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
