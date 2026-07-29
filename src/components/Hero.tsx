"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-16 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[60%_40%] gap-12 lg:gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="text-accent text-sm tracking-[0.25em] uppercase font-medium"
            >
              Premium Art Gallery
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-heading mt-4 leading-tight"
            >
              Where Art Finds Its Home
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted text-base sm:text-lg mt-6 max-w-lg leading-relaxed"
            >
              Discover curated masterpieces from renowned artists worldwide. 
              From classical Renaissance to contemporary digital art — every piece tells a story.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <a
                href="#gallery"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-7 py-3 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent-hover hover:scale-[1.02] transition-all duration-200"
              >
                Explore Gallery
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-7 py-3 border border-accent text-accent text-sm font-medium rounded-md hover:bg-accent/10 hover:scale-[1.02] transition-all duration-200"
              >
                Commission Art
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border-4 border-accent/30 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80"
                alt="Art gallery interior with paintings"
                className="w-full h-[420px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
