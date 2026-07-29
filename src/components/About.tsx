"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            <div className="absolute -top-8 -left-8 w-72 h-72 rounded-full bg-secondary/[0.04] blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-6 right-4 w-40 h-40 rounded-full bg-accent/[0.05] blur-[60px] pointer-events-none" />

            <div className="relative w-full max-w-[500px]">
              <div className="absolute -top-4 -left-4 w-full h-full rounded-[50%_60%_40%_60%/60%_40%_60%_40%] border border-accent/20" />
              <div className="relative rounded-[50%_60%_40%_60%/60%_40%_60%_40%] overflow-hidden shadow-organic">
                <div className="bg-gradient-to-br from-accent/8 via-transparent to-secondary/8 aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80"
                    alt="Art gallery interior warm lighting"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent text-sm tracking-[0.25em] uppercase font-medium">
              About Artenza
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-heading mt-4 leading-tight">
              A Modern Platform
              <br />
              <span className="text-accent">Preserving Creativity</span>
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-accent/30 mt-6 mb-8" />
            <p className="text-muted text-base leading-relaxed">
              Artenza is a modern platform preserving creativity and connecting artists
              worldwide. We curate exceptional works from emerging talents and established
              masters, bridging the gap between traditional craftsmanship and contemporary
              expression.
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
