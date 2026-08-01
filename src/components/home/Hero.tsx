"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Variants } from "framer-motion";
import Button from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[460px] h-[460px] rounded-full bg-secondary/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-28">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-medium tracking-wide uppercase mb-6"
            >
              <Sparkles size={14} />
              Curated Art &amp; Custom Commissions
            </motion.div>

            <motion.h1
              variants={item}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-heading leading-[1.05] tracking-tight"
            >
              Art that speaks
              <br />
              to{" "}
              <span className="italic bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                your soul
              </span>
              .
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 text-base sm:text-lg text-body max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Discover museum-quality originals, limited prints, and one-of-a-kind
              commissions crafted by today&apos;s most compelling artists.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
            >
              <Button
                href="#gallery"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
                className="w-full sm:w-auto"
              >
                Explore Gallery
              </Button>
              <Button
                href="#contact"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Custom Commission
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
            >
              <div>
                <p className="font-serif text-2xl font-bold text-heading">300+</p>
                <p className="text-xs text-muted uppercase tracking-wider">Original Works</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="font-serif text-2xl font-bold text-heading">50+</p>
                <p className="text-xs text-muted uppercase tracking-wider">Featured Artists</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="font-serif text-2xl font-bold text-heading">100%</p>
                <p className="text-xs text-muted uppercase tracking-wider">Authentic Pieces</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent to-secondary opacity-15 rotate-3 scale-[1.02]" />
              <div className="relative rounded-[2rem] overflow-hidden border border-border shadow-soft aspect-[4/5] bg-section">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-art.svg"
                  alt="Featured artwork"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="backdrop-blur-md bg-white/15 border border-white/25 rounded-2xl px-4 py-3">
                    <p className="font-serif text-white text-lg font-semibold">
                      The Silent Muse
                    </p>
                    <p className="text-white/80 text-xs mt-0.5">
                      Oil on canvas · 120 × 90 cm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
