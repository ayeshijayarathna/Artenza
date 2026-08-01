"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: ReactNode;
  error?: string;
  hint?: string;
}

export default function Input({
  label,
  leftIcon,
  error,
  hint,
  id,
  className = "",
  type = "text",
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-") || "field"}`;
  const hasValue = rest.value !== undefined ? String(rest.value).length > 0 : false;
  const float = focused || hasValue;

  return (
    <div className={className}>
      <div
        className={`relative transition-all duration-200 ${
          error ? "animate-shake" : ""
        }`}
      >
        {leftIcon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent pointer-events-none z-10">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={label ? " " : rest.placeholder}
          className={`peer w-full bg-card border rounded-lg text-sm text-heading placeholder:text-muted/60 transition-all duration-200 focus:outline-none ${
            leftIcon ? "pl-11" : "pl-4"
          } pr-4 py-3 ${
            error
              ? "border-danger focus:border-danger focus:ring-[0_0_0_3px_rgba(217,83,79,0.12)]"
              : "border-border focus:border-accent focus:shadow-[0_0_0_3px_rgba(196,114,74,0.12)]"
          }`}
          aria-invalid={!!error}
          {...rest}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              leftIcon ? "peer-focus:left-11" : "peer-focus:left-4"
            } ${
              float
                ? "top-1.5 text-[10px] text-accent"
                : "top-1/2 -translate-y-1/2 text-sm text-muted"
            } ${error ? "text-danger" : ""}`}
          >
            {label}
          </label>
        )}
      </div>
      {error ? (
        <p className="mt-1 text-xs text-danger pl-1">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-muted pl-1">{hint}</p>
      ) : null}
    </div>
  );
}
