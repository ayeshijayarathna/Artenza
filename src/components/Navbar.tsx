"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-page/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleClick("#hero"); }}
             className="font-serif text-2xl font-bold text-accent tracking-wide">
            ARTENZA
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => handleClick(link.href)}
                className="text-sm text-muted hover:text-accent transition-colors">
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-3 ml-4">
              <a href="/login"
                className="text-sm text-muted hover:text-accent transition-colors">
                Login
              </a>
              <a href="/register"
                className="text-sm px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors font-medium">
                Register
              </a>
            </div>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-heading">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-card border-t border-border px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <button key={link.href} onClick={() => handleClick(link.href)}
              className="block w-full text-left text-sm text-muted hover:text-accent transition-colors py-1">
              {link.label}
            </button>
          ))}
          <div className="flex gap-3 pt-2 border-t border-border">
            <a href="/login" className="text-sm text-muted hover:text-accent py-1">Login</a>
            <a href="/register"
              className="text-sm px-4 py-1.5 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors font-medium">
              Register
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
