"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  href?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  outline: "border border-accent text-accent bg-transparent hover:bg-accent/10",
  ghost: "border border-border text-heading bg-transparent hover:bg-section",
  danger: "bg-danger text-white hover:bg-danger/90",
};

const sizeClasses: Record<Size, string> = {
  sm: "py-1.5 px-4 text-xs",
  md: "py-2.5 px-5 text-sm",
  lg: "py-3 px-7 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  href,
  disabled,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium cursor-pointer select-none transition-all duration-150 hover:-translate-y-px hover:brightness-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = isLoading ? (
    <>
      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <span>Loading...</span>
    </>
  ) : (
    <>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  );
}
