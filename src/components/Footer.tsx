"use client";

import { motion } from "framer-motion";
import { Globe, MessageCircle, Briefcase, Zap } from "lucide-react";

const footerLinks = {
  Gallery: ["Explore Artworks", "3D Virtual Tour", "Custom Commissions", "Pricing"],
  Dashboard: ["My Orders", "My Bills", "Notifications", "Profile"],
  Legal: ["Privacy Policy", "Terms of Service", "Shipping Policy", "Refund Policy"],
};

const columns = Object.entries(footerLinks);

export default function Footer() {
  return (
    <footer>
      <div className="bg-section border-t border-border">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <span className="font-serif text-2xl font-bold text-heading tracking-wide">
                Artenza
              </span>
              <p className="text-sm text-muted mt-2 leading-relaxed">
                Art Gallery &amp; Custom Commissions.
                <br />
                Bringing Renaissance to the modern age.
              </p>
              <div className="flex items-center gap-3 mt-5">
                {[Globe, MessageCircle, Briefcase].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted hover:text-accent hover:scale-110 transition-all duration-200"
                    aria-label="Social link"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>

            {columns.map(([title, links], colIdx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (colIdx + 1) * 0.1 }}
              >
                <h4 className="font-serif text-base font-semibold text-heading">
                  {title}
                </h4>
                <div className="w-6 h-0.5 bg-accent mt-2 mb-4" />
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="inline-block text-sm text-body hover:text-accent hover:translate-x-1 transition-all duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-border border-t border-[#D4C9BA]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
              <Zap size={10} className="text-accent" />
            </span>
            &copy; {new Date().getFullYear()} Artenza. All rights reserved.
          </p>
          <p className="text-sm text-muted">
            Crafted with care in Sri Lanka 🇱🇰
          </p>
        </div>
      </div>
    </footer>
  );
}
