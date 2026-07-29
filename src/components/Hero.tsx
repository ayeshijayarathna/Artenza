"use client";

import { motion } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-organic-circle bg-organic-circle-secondary pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-[55%_45%] gap-14 lg:gap-20 items-center">
          <div>
            <motion.p {...fadeUp(0)} className="text-accent text-sm tracking-[0.25em] uppercase font-medium">
              Contemporary Art Experience
            </motion.p>
            <motion.h1
              {...fadeUp(0.12)}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-heading mt-5 leading-[1.05] tracking-tight"
            >
              Where Art
              <br />
              Finds Its
              <br />
              <span className="text-accent">Home</span>
            </motion.h1>
            <motion.p
              {...fadeUp(0.24)}
              className="text-muted text-base sm:text-lg mt-6 max-w-lg leading-relaxed"
            >
              A premium art marketplace connecting creators, collectors and art lovers
              through immersive digital experiences.
            </motion.p>
            <motion.div {...fadeUp(0.36)} className="flex flex-wrap gap-4 mt-10">
              <a
                href="#gallery"
                onClick={(e) => { e.preventDefault(); document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group relative px-8 py-3.5 bg-accent text-white text-sm font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                <span className="relative z-10">Explore Gallery</span>
                <span className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
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
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative flex justify-center"
          >
            <div className="absolute -top-10 -right-4 w-64 h-64 rounded-full bg-accent/8 blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-secondary/8 blur-[60px] pointer-events-none" />

            <div className="relative w-full max-w-[420px]">
              <div className="absolute -top-6 -right-6 w-full h-full rounded-[40px] border border-accent/20" />
              <div className="relative rounded-[32px] overflow-hidden shadow-organic">
                <div className="bg-gradient-to-br from-accent/10 via-transparent to-secondary/10 aspect-[4/5] sm:aspect-[3/4]">
                  <img
                    src="https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80"
                    alt="Art gallery interior with paintings"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
