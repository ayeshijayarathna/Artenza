"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full rounded-[2rem] bg-gradient-to-br from-accent/15 to-secondary/15" />
              <div className="relative rounded-[2rem] overflow-hidden border border-border shadow-soft aspect-[4/3] bg-section">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about-studio.svg"
                  alt="Artenza studio"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-heading leading-tight">
              Where tradition meets <span className="italic text-accent">tomorrow</span>
            </h2>
            <p className="mt-6 text-body leading-relaxed">
              Artenza was born from a simple belief: art should be felt, not just viewed.
              We partner with emerging and established artists to bring you work that
              transforms the spaces it inhabits — and the people who live with it.
            </p>
            <p className="mt-4 text-body leading-relaxed">
              From intimate portraits to monumental abstracts, every piece in our
              collection carries a story. Whether you&apos;re buying your first artwork or
              growing a private collection, our advisors are here to guide you.
            </p>

            <blockquote className="mt-8 relative rounded-2xl border border-border bg-section/60 p-6">
              <Quote size={28} className="text-accent/50" />
              <p className="mt-3 font-serif text-lg text-heading italic leading-relaxed">
                &ldquo;Art is the bridge between what we see and what we feel.&rdquo;
              </p>
              <footer className="mt-3 text-sm text-muted">— The Artenza Philosophy</footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
