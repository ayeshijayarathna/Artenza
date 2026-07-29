"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const contactDetails = [
  { icon: Mail, label: "Email", value: "hello@artenza.gallery" },
  { icon: Phone, label: "Phone", value: "+94 11 234 5678" },
  { icon: MapPin, label: "Address", value: "42 Gallery Lane, Colombo 03, Sri Lanka" },
];

export default function Contact() {
  const { theme } = useTheme();

  return (
    <section id="contact" className="relative py-28 bg-section overflow-hidden">
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm tracking-[0.25em] uppercase font-medium">
            Get in Touch
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-heading mt-4 leading-tight">
            We&rsquo;d Love to
            <br />
            <span className="text-accent">Hear from You</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-accent/30 mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted text-base leading-relaxed mb-10">
              Whether you have a question about our collection, want to commission a piece,
              or just want to say hello — we&apos;d love to hear from you.
            </p>
            <div className="space-y-6 mb-10">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div key={detail.label} className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="pt-1.5">
                      <p className="text-xs text-muted uppercase tracking-wider">{detail.label}</p>
                      <p className="text-sm font-medium text-heading">{detail.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <form className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-7 sm:p-8 space-y-5 shadow-soft">
              <h3 className="font-serif text-lg font-semibold text-heading">Send a Message</h3>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-page/70 border border-border rounded-xl text-sm text-heading placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-page/70 border border-border rounded-xl text-sm text-heading placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-page/70 border border-border rounded-xl text-sm text-heading placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                className="group relative w-full py-3.5 bg-accent text-white text-sm font-medium rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-glow"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message <Send size={15} />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-border shadow-soft h-[500px]">
              <iframe
                src="https://www.google.com/maps?q=Colombo,Sri+Lanka&output=embed"
                className="w-full h-full"
                loading="lazy"
                title="Artenza Gallery Location"
                style={{
                  filter: theme === "dark" ? "brightness(0.75) contrast(1.15) saturate(0.9)" : "brightness(1) contrast(1)",
                  transition: "filter 0.35s",
                }}
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-40 h-40 bg-accent/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
