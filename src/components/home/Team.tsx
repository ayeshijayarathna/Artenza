"use client";

import { motion } from "framer-motion";

const team = [
  { name: "Isabelle Laurent", role: "Founder & Chief Curator" },
  { name: "Marco Bellini", role: "Head of Commissions" },
  { name: "Amara Chen", role: "Senior Art Advisor" },
];

export default function Team() {
  return (
    <section id="team" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            The Team
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-heading">
            Guided by <span className="italic text-accent">passion</span>
          </h2>
          <p className="mt-4 text-body leading-relaxed">
            Collectors, artists, and advisors with decades of combined experience in the
            fine-art world.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-accent/20 to-secondary/20 border-2 border-accent/30">
                <div className="absolute inset-0 flex items-center justify-center font-serif text-3xl font-bold text-accent">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-heading">{member.name}</h3>
              <p className="text-sm text-muted mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
