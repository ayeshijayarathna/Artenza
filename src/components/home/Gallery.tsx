"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export interface ArtworkCard {
  _id: string;
  title: string;
  artist: string;
  price: number;
  images: string[];
  category: string;
  medium?: string;
  type?: string;
  status?: string;
  dimensions?: { width?: number; height?: number; unit?: string };
}

export default function Gallery({ artworks }: { artworks: ArtworkCard[] }) {
  const shown = artworks.slice(0, 6);

  return (
    <section id="gallery" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              The Collection
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-heading">
              Featured <span className="italic text-accent">Works</span>
            </h2>
          </div>
          <Button href="#contact" variant="outline">
            Request a Private Viewing
          </Button>
        </div>

        {shown.length === 0 ? (
          <p className="text-muted text-center py-16">
            The collection is being curated — check back soon.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map((art, i) => (
              <motion.a
                key={art._id}
                href={`/artwork/${art._id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative rounded-2xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-section relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={art.images?.[0] || "/images/hero-art.svg"}
                    alt={art.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                  {art.status && <Badge className="absolute top-3 left-3">{art.status}</Badge>}
                  <span className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-heading opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight size={16} />
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-serif text-white text-lg font-semibold leading-tight">
                      {art.title}
                    </p>
                    <p className="text-white/75 text-xs mt-1">
                      {art.artist}
                      {art.medium ? ` · ${art.medium}` : ""}
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-muted capitalize">{art.category}</span>
                  <span className="font-serif text-accent font-semibold">
                    ${art.price?.toLocaleString()}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
