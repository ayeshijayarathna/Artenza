"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Paintings", "Digital", "Sculpture", "Photography"];

const artworks = [
  { id: 1, title: "Golden Hour", artist: "Elena Vasquez", price: "$4,200", category: "Paintings", available: true, img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80" },
  { id: 2, title: "Digital Dreams", artist: "Marcus Chen", price: "$2,800", category: "Digital", available: true, img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80" },
  { id: 3, title: "Bronze Elegance", artist: "Sarah Mitchell", price: "$6,500", category: "Sculpture", available: false, img: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&q=80" },
  { id: 4, title: "Urban Reflections", artist: "David Park", price: "$3,100", category: "Photography", available: true, img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80" },
  { id: 5, title: "Whispers of Spring", artist: "Amara Okafor", price: "$5,600", category: "Paintings", available: true, img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80" },
  { id: 6, title: "Neon Horizon", artist: "Yuki Tanaka", price: "$3,900", category: "Digital", available: true, img: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&q=80" },
];

export default function GalleryPreview() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? artworks : artworks.filter((a) => a.category === active);

  return (
    <section id="gallery" className="py-24 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent text-sm tracking-[0.25em] uppercase font-medium">
            Explore Gallery
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-heading mt-3">
            Curated Masterpieces
          </h2>
          <div className="w-14 h-0.5 bg-accent mx-auto mt-5" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                active === cat
                  ? "bg-accent text-white"
                  : "bg-card border border-border text-muted hover:text-accent hover:border-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filtered.map((art) => (
              <motion.div
                key={art.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={art.img}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-0.5 text-[11px] font-medium rounded-full ${
                      art.available
                        ? "bg-success/15 text-success"
                        : "bg-muted/15 text-muted"
                    }`}
                  >
                    {art.available ? "Available" : "Sold"}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-heading">{art.title}</h3>
                  <p className="text-sm text-muted mt-0.5">{art.artist}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className="text-accent font-medium text-sm">{art.price}</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-xs text-accent border border-accent rounded-md hover:bg-accent/10 transition-colors">
                        View
                      </button>
                      <button className="px-3 py-1.5 text-xs text-white bg-accent rounded-md hover:bg-accent-hover transition-colors">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
