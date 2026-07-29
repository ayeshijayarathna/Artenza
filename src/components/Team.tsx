"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, MessageCircle, Briefcase } from "lucide-react";

const team = [
  {
    name: "Isabella Rossi",
    role: "Curator & Founder",
    bio: "With over 15 years in the art world, Isabella brings a discerning eye and a passion for emerging talent.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
  },
  {
    name: "Amara Silva",
    role: "Art Director",
    bio: "Amara shapes the visual identity of our exhibitions, blending tradition with contemporary aesthetics.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
  },
  {
    name: "James Carter",
    role: "Head of Commissions",
    bio: "James guides collectors through bespoke commissions, ensuring every detail reflects their vision.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
];

function Avatar({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  return (
    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-2 ring-accent/30 ring-offset-2 ring-offset-card mb-5 bg-gradient-to-br from-accent/10 to-secondary/10">
      {!error && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="relative py-28 bg-section overflow-hidden">
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm tracking-[0.25em] uppercase font-medium">
            Our Team
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-heading mt-4 leading-tight">
            Meet the
            <br />
            <span className="text-accent">Visionaries</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent to-accent/30 mx-auto mt-6" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-3xl p-8 sm:p-10 text-center hover:-translate-y-1 hover:shadow-organic hover:border-accent/20 transition-all duration-300"
            >
              <Avatar src={member.img} alt={member.name} />
              <h3 className="font-serif text-xl font-semibold text-heading">{member.name}</h3>
              <p className="text-sm text-accent font-medium mt-1">{member.role}</p>
              <p className="text-sm text-muted leading-relaxed mt-3 mb-6">{member.bio}</p>
              <div className="flex justify-center gap-3">
                {[Globe, MessageCircle, Briefcase].map((Icon, j) => (
                  <a
                    key={j}
                    href="#"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted hover:text-accent hover:border-accent hover:bg-accent/5 transition-all duration-200"
                    aria-label="Social link"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
