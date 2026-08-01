"use client";

import { motion } from "framer-motion";
import { Palette, Paintbrush, Truck, ShieldCheck, HeartHandshake, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Curated Originals",
    text: "Every piece is hand-selected by our curators for artistic merit, authenticity, and lasting value.",
  },
  {
    icon: Paintbrush,
    title: "Bespoke Commissions",
    text: "Work one-on-one with our artists to bring your vision to life — portrait, landscape, or abstract.",
  },
  {
    icon: ShieldCheck,
    title: "Authenticity Guaranteed",
    text: "Certificates of authenticity accompany every original work, backed by our full guarantee.",
  },
  {
    icon: Truck,
    title: "White-Glove Delivery",
    text: "Climate-controlled shipping, secure crating, and insured worldwide delivery to your door.",
  },
  {
    icon: HeartHandshake,
    title: "Artist-First",
    text: "Fair pricing that supports the creators, so great art keeps flowing into the world.",
  },
  {
    icon: BadgeCheck,
    title: "Collector Support",
    text: "Private viewings, art advisory, and guidance for first-time and seasoned collectors alike.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-section/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Why Artenza
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-heading">
            A gallery built <span className="italic text-accent">for you</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-soft transition-all duration-300"
            >
              <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-accent/10 text-accent">
                <f.icon size={20} />
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-heading">{f.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
