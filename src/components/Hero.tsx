"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "./Navbar";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen bg-page pt-16">
      <Navbar />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] flex items-center"
      >
        <div className="grid lg:grid-cols-5 gap-12 items-center w-full">
          <div className="lg:col-span-3 space-y-8">
            <motion.p variants={item} className="text-accent text-sm tracking-[0.25em] uppercase font-medium">
              Art Gallery &amp; Custom Commissions
            </motion.p>

            <motion.h1 variants={item} className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-heading leading-[1.1]">
              Where Art
              <br />
              Finds Its Home
            </motion.h1>

            <motion.p variants={item} className="text-muted text-lg max-w-lg leading-relaxed">
              Curated artwork from visionary artists. Commission custom pieces that
              speak to your soul. Experience art reimagined for the modern age.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
              <a
                href="/register"
                className="px-7 py-3 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent-hover transition-colors"
              >
                Explore Gallery
              </a>
              <a
                href="#gallery"
                className="px-7 py-3 border border-accent text-accent text-sm font-medium rounded-md hover:bg-accent/5 transition-colors"
              >
                Commission Art
              </a>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-card bg-section"
                  />
                ))}
              </div>
              <span className="text-xs text-muted">
                Join <strong className="text-heading">2,400+</strong> collectors
              </span>
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="lg:col-span-2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border-4 border-accent/30 shadow-xl">
              <div className="absolute inset-0 bg-accent/5 z-10 pointer-events-none" />
              <Image
                src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format"
                alt="Art gallery showcase"
                width={800}
                height={1000}
                className="w-full h-auto object-cover aspect-[3/4]"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-lg px-4 py-3 shadow-sm hidden sm:block">
              <p className="text-xs text-muted">Curated Collection</p>
              <p className="text-sm font-semibold text-heading">200+ Artworks</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
