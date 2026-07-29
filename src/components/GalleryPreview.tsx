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

function ArtImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-secondary/10">
      {!error && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

export default function GalleryPreview() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? artworks : artworks.filter((a) => a.category === active);

  const handleBuyNow = () => {
    window.location.href = "/auth/login";
  };

  return (
    <section id="gallery" className="relative py-28 overflow-hidden">
      <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-secondary/[0.03] blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-accent text-sm tracking-[0.25em] uppercase font-medium">
            Explore Gallery
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-heading mt-4 leading-tight">
            Explore Our
            <br />
            <span className="text-accent">Collection</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-accent/30 mx-auto mt-6" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                active === cat
                  ? "bg-accent text-white shadow-md"
                  : "bg-section/60 border border-border/60 text-muted hover:text-accent hover:border-accent/50"
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
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((art) => (
              <motion.div
                key={art.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-organic hover:border-accent/20 transition-all duration-300"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <ArtImage src={art.img} alt={art.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  <span
                    className={`absolute top-4 right-4 z-10 px-3 py-1 text-[11px] font-medium rounded-full backdrop-blur-sm ${
                      art.available
                        ? "bg-black/30 text-white"
                        : "bg-black/20 text-white/70"
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
                      <button className="px-3 py-1.5 text-xs text-accent border border-accent/40 rounded-full hover:bg-accent/10 hover:border-accent transition-all duration-200">
                        View
                      </button>
                      <button
                        onClick={handleBuyNow}
                        className="px-3 py-1.5 text-xs text-white bg-accent rounded-full hover:bg-accent-hover transition-all duration-200"
                      >
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
