"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Reveal from "./Reveal";

const categories = ["All", "Paintings", "Digital", "Sculpture", "Photography"];

const artworks = [
  {
    id: 1,
    title: "Whispers of the East",
    artist: "Amaya Perera",
    price: 2400,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=600&auto=format",
    category: "Paintings",
    medium: "Oil on Canvas",
  },
  {
    id: 2,
    title: "Ethereal Dreams",
    artist: "Marcus Chen",
    price: 1800,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format",
    category: "Digital",
    medium: "Digital Print",
  },
  {
    id: 3,
    title: "Golden Hour",
    artist: "Sofia Reyes",
    price: 3200,
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=600&auto=format",
    category: "Paintings",
    medium: "Acrylic on Canvas",
  },
  {
    id: 4,
    title: "Urban Solitude",
    artist: "Ravi Kumar",
    price: 1600,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=600&auto=format",
    category: "Photography",
    medium: "Fine Art Print",
  },
  {
    id: 5,
    title: "Eternal Bloom",
    artist: "Yuki Tanaka",
    price: 2800,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&auto=format",
    category: "Sculpture",
    medium: "Bronze",
  },
  {
    id: 6,
    title: "Crimson Tide",
    artist: "Elena Vasquez",
    price: 2100,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format",
    category: "Digital",
    medium: "Digital Print",
  },
];

export default function GalleryPreview() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? artworks : artworks.filter((a) => a.category === active);

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="text-accent text-sm tracking-[0.25em] uppercase font-medium">
            Explore Gallery
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-heading mt-3">
            Explore Our Collection
          </h2>
          <div className="w-14 h-0.5 bg-accent mx-auto mt-6" />
        </Reveal>

        <Reveal className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-sm rounded-full transition-colors ${
                active === cat
                  ? "bg-accent text-white"
                  : "bg-section text-body hover:bg-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art, i) => (
            <Reveal key={art.id} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-card border border-border rounded-2xl overflow-hidden group cursor-default"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={art.image}
                    alt={art.title}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-xs font-medium bg-accent-sage/90 text-white rounded-full">
                      Available
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-heading">{art.title}</h3>
                    <p className="text-muted text-sm">{art.artist} · {art.medium}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-accent font-semibold text-lg">
                      ${art.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button className="flex-1 px-3 py-2 text-xs text-accent border border-accent rounded-md hover:bg-accent/5 transition-colors">
                      View
                    </button>
                    <a
                      href="/login"
                      className="flex-1 px-3 py-2 text-xs text-white bg-accent rounded-md hover:bg-accent-hover transition-colors text-center block"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
