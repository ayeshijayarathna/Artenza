"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
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
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-heading mt-4 leading-[1.1] tracking-tight"
            >
              Where Art
              <br />
              Finds Its
              <br />
              <span className="text-accent">Home</span>
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
              className="flex flex-wrap gap-4 mt-10"
            >
              <a
                href="#gallery"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative px-8 py-3.5 bg-accent text-white text-sm font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-glow"
              >
                <span className="relative z-10">Explore Gallery</span>
                <span className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3.5 border border-accent/40 text-accent text-sm font-medium rounded-full hover:bg-accent/8 hover:border-accent hover:scale-[1.03] transition-all duration-200"
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
            <div className="relative rounded-3xl overflow-hidden shadow-glow">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent z-10" />
              <div className="bg-image-fallback aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80"
                  alt="Art gallery interior with paintings"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-40 h-40 bg-secondary/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
