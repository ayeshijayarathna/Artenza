"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-soft">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/15 via-transparent to-transparent z-10" />
              <div className="bg-image-fallback aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80"
                  alt="Art gallery interior warm lighting"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-accent/5 rounded-full blur-3xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent text-sm tracking-[0.25em] uppercase font-medium">
              Our Story
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-heading mt-4 leading-tight">
              Where Passion
              <br />
              <span className="text-accent">Meets Canvas</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-accent/30 mt-6 mb-8" />
            <p className="text-muted text-base leading-relaxed">
              Founded in the heart of Colombo, Artenza is more than a gallery — it&apos;s a
              sanctuary for art lovers and collectors. We curate exceptional works from
              emerging talents and established masters, bridging the gap between traditional
              craftsmanship and modern expression.
            </p>
            <p className="text-muted text-base leading-relaxed mt-5">
              Every piece in our collection is hand-selected for its emotional resonance
              and artistic integrity. Whether you&apos;re a seasoned collector or a first-time
              buyer, our team is dedicated to helping you find art that speaks to you.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
