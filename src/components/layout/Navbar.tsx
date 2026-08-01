"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown, LayoutDashboard, User, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import NotificationBell from "./NotificationBell";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Features", href: "#features" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  const isLoggedIn = status === "authenticated";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      let current = "";
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const rect = (el as HTMLElement).getBoundingClientRect();
          if (rect.top <= 120) current = link.href;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const initials = (session?.user?.name || session?.user?.email || "U")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 dark:bg-[#161312]/90 backdrop-blur-md border-b border-border transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleClick("#home"); }}
            className="font-serif text-[22px] font-bold text-heading tracking-wide"
          >
            Artenza
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => handleClick(link.href)}
                className={`relative text-sm py-1 transition-colors group ${
                  active === link.href ? "text-accent" : "text-body hover:text-accent"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${
                    active === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </motion.button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-10 h-10 flex items-center justify-center rounded-full text-muted hover:text-accent hover:bg-section transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {status === "loading" ? (
              <span className="text-sm text-muted">...</span>
            ) : isLoggedIn ? (
              <>
                <NotificationBell />
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen((m) => !m)}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-section transition-colors"
                    aria-label="Account menu"
                  >
                    {session.user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-8 h-8 rounded-full object-cover border border-accent/40"
                      />
                    ) : (
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-accent text-white text-xs font-semibold">
                        {initials}
                      </span>
                    )}
                    <ChevronDown size={14} className="text-muted" />
                  </button>
                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-0 top-12 w-52 bg-card border border-border rounded-2xl shadow-soft overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-border">
                          <p className="text-sm font-medium text-heading truncate">
                            {session.user?.name || "User"}
                          </p>
                          <p className="text-xs text-muted truncate">{session.user?.email}</p>
                        </div>
                        <div className="py-1">
                          <a
                            href="/dashboard"
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-body hover:text-accent hover:bg-section transition-colors"
                          >
                            <LayoutDashboard size={16} /> Dashboard
                          </a>
                          <a
                            href="/dashboard/profile"
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-body hover:text-accent hover:bg-section transition-colors"
                          >
                            <User size={16} /> Profile
                          </a>
                          <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-body hover:text-danger hover:bg-section transition-colors"
                          >
                            <LogOut size={16} /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <a
                  href="/dashboard/requests/new"
                  className="px-4 py-2 text-sm text-accent border border-accent rounded-full hover:bg-accent/10 transition-all duration-150"
                >
                  Customize Request
                </a>
                <a
                  href="/auth/login"
                  className="px-4 py-2 text-sm text-white bg-accent rounded-full hover:bg-accent-hover transition-all duration-150"
                >
                  Login
                </a>
              </>
            )}
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-[#161312]/95 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`block w-full text-left text-sm py-2 transition-colors ${
                    active === link.href ? "text-accent" : "text-body hover:text-accent"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-2 pt-3 border-t border-border">
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-muted hover:text-accent transition-colors shrink-0"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                )}
                {isLoggedIn ? (
                  <>
                    <NotificationBell />
                    <a
                      href="/dashboard"
                      className="flex-1 text-center px-3 py-2 text-sm text-white bg-accent rounded-full"
                    >
                      Dashboard
                    </a>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex-1 text-center px-3 py-2 text-sm text-accent border border-accent rounded-full"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/dashboard/requests/new"
                      className="flex-1 text-center px-3 py-2 text-sm text-accent border border-accent rounded-full"
                    >
                      Customize Request
                    </a>
                    <a
                      href="/auth/login"
                      className="flex-1 text-center px-3 py-2 text-sm text-white bg-accent rounded-full"
                    >
                      Login
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
