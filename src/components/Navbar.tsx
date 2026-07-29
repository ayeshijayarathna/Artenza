"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Features", href: "#features" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-card transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleClick("#hero"); }}
              className="font-serif text-2xl font-bold text-heading tracking-wide"
            >
              Artenza
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="relative text-sm text-body hover:text-accent transition-colors py-1 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted hover:text-accent hover:border-accent transition-colors"
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? <Moon size="16" /> : <Sun size="16" />}
              </button>
              <a
                href="/customize"
                className="px-4 py-2 text-sm text-accent border border-accent rounded-md hover:bg-accent/5 transition-colors"
              >
                Customize Request
              </a>
              <a
                href="/login"
                className="px-4 py-2 text-sm text-white bg-accent rounded-md hover:bg-accent-hover transition-colors"
              >
                Login
              </a>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-heading p-2"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="block w-full text-left text-sm text-body hover:text-accent py-1.5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <button
                  onClick={toggleTheme}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted hover:text-accent hover:border-accent transition-colors shrink-0"
                  aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                >
                  {theme === "light" ? <Moon size="16" /> : <Sun size="16" />}
                </button>
                <a
                  href="/customize"
                  className="flex-1 text-center px-3 py-2 text-sm text-accent border border-accent rounded-md hover:bg-accent/5 transition-colors"
                >
                  Customize Request
                </a>
                <a
                  href="/login"
                  className="flex-1 text-center px-3 py-2 text-sm text-white bg-accent rounded-md hover:bg-accent-hover transition-colors"
                >
                  Login
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
