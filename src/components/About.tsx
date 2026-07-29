"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80"
                alt="Art gallery interior warm lighting"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
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
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-heading mt-3">
              Where Passion Meets Canvas
            </h2>
            <div className="w-14 h-0.5 bg-accent mt-5 mb-6" />
            <p className="text-muted text-base leading-relaxed">
              Founded in the heart of Colombo, Artenza is more than a gallery — it&apos;s a 
              sanctuary for art lovers and collectors. We curate exceptional works from 
              emerging talents and established masters, bridging the gap between traditional 
              craftsmanship and modern expression.
            </p>
            <p className="text-muted text-base leading-relaxed mt-4">
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
