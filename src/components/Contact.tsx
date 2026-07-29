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
    <section id="contact" className="py-24 bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-heading mt-3">
            We&rsquo;d Love to Hear from You
          </h2>
          <div className="w-14 h-0.5 bg-accent mx-auto mt-5" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <p className="text-muted text-base leading-relaxed">
              Whether you have a question about our collection, want to commission a piece, 
              or just want to say hello — we&apos;d love to hear from you.
            </p>
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <div key={detail.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">{detail.label}</p>
                    <p className="text-sm font-medium text-heading">{detail.value}</p>
                  </div>
                </div>
              );
            })}

            <form className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5">
              <h3 className="font-serif text-lg font-semibold text-heading">Send a Message</h3>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-page border border-border rounded-lg text-sm text-heading placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-page border border-border rounded-lg text-sm text-heading placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-page border border-border rounded-lg text-sm text-heading placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
              >
                Send Message <Send size={15} />
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
            <iframe
              src="https://www.google.com/maps?q=Colombo,Sri+Lanka&output=embed"
              className="w-full h-[400px] rounded-2xl border border-border shadow-lg"
              loading="lazy"
              title="Artenza Gallery Location"
              style={{
                filter: theme === "dark" ? "brightness(0.8) contrast(1.1)" : "brightness(1) contrast(1)",
                transition: "filter 0.3s",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
