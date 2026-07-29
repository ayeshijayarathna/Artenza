"use client";

import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800&auto=format"
                  alt="Art gallery interior warm lighting"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-card border border-border rounded-xl px-5 py-4 shadow-sm hidden lg:block">
                <p className="font-serif text-2xl font-bold text-heading">15+</p>
                <p className="text-xs text-muted">Years of Excellence</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-6">
              <p className="text-accent text-sm tracking-[0.25em] uppercase font-medium">
                About Us
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-heading leading-tight">
                A Gallery Born from Passion
              </h2>
              <div className="w-14 h-0.5 bg-accent" />
              <p className="text-body leading-relaxed">
                Artenza was founded with a singular vision — to create a space where
                art transcends boundaries. We believe every piece tells a story, and
                every collector deserves a gallery experience that feels personal,
                intentional, and inspiring.
              </p>
              <p className="text-muted leading-relaxed">
                From emerging talents to established masters, our curated collection
                spans continents and centuries. Whether you&apos;re browsing our
                virtual gallery or commissioning a bespoke creation, Artenza brings
                the Renaissance spirit into the modern world.
              </p>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="font-serif text-2xl font-bold text-heading">2,400+</p>
                  <p className="text-xs text-muted">Artworks Collected</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="font-serif text-2xl font-bold text-heading">500+</p>
                  <p className="text-xs text-muted">Happy Collectors</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="font-serif text-2xl font-bold text-heading">12</p>
                  <p className="text-xs text-muted">Countries Served</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
