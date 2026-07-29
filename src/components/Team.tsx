"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import Reveal from "./Reveal";

const team = [
  {
    name: "Elena Vasquez",
    role: "Gallery Director & Curator",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format",
    bio: "With over 15 years in fine art curation, Elena brings an eye for emerging talent and a passion for cross-boundary expression.",
  },
  {
    name: "James Okonkwo",
    role: "Lead Curator",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format",
    bio: "James specializes in contemporary African and diaspora art, building bridges between traditional techniques and modern narratives.",
  },
  {
    name: "Priya Sharma",
    role: "Commission Artist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format",
    bio: "Priya works across oil, watercolor, and digital mediums, creating bespoke pieces that capture her clients&apos; deepest visions.",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 lg:py-32 bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.25em] uppercase font-medium">
            Our Team
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-heading mt-3">
            Meet Our Team
          </h2>
          <div className="w-14 h-0.5 bg-accent mx-auto mt-6" />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-card border border-border rounded-2xl p-8 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden ring-2 ring-accent/30 ring-offset-2">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold text-heading mb-1">
                  {member.name}
                </h3>
                <p className="text-muted text-sm mb-4">{member.role}</p>
                <p className="text-muted/80 text-sm leading-relaxed mb-5">{member.bio}</p>
                <div className="flex items-center justify-center gap-3">
                  <a href="#" className="text-muted hover:text-accent transition-colors" aria-label="Instagram">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="text-muted hover:text-accent transition-colors" aria-label="Twitter">
                    <Twitter size={18} />
                  </a>
                  <a href="#" className="text-muted hover:text-accent transition-colors" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
