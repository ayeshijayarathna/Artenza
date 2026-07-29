"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, MessageCircle, Briefcase, User, Tag, MessageSquare, Send, Clock, Zap } from "lucide-react";

const contactCards = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@artenza.gallery",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: ["+94 11 234 5678", "Mon–Sat, 9AM – 6PM"],
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: ["42 Gallery Lane,", "Colombo 03, Sri Lanka"],
  },
];

const socialIcons = [Globe, MessageCircle, Briefcase];

const formFields = [
  { icon: User, placeholder: "Full Name", type: "text", col: "half" },
  { icon: Mail, placeholder: "Email Address", type: "email", col: "half" },
  { icon: Tag, placeholder: "Subject", type: "text", col: "full" },
  { icon: Phone, placeholder: "Phone Number — optional", type: "tel", col: "full" },
  { icon: MessageSquare, placeholder: "Your Message", type: "textarea", col: "full" },
];

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 1500);
  };

  return (
    <section id="contact" className="py-24 bg-page">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-[11px] tracking-[0.15em] uppercase font-medium">
            Contact Us
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-heading mt-3">
            Let&rsquo;s Start a Conversation
          </h2>
          <p className="text-muted text-base max-w-md mx-auto mt-4 leading-relaxed">
            Whether you&rsquo;re looking for a specific artwork, want to commission something unique, or simply want to know more about our gallery.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[45%_55%] gap-16">
          <div className="space-y-5">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-[18px_20px] flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FAF0EB] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted">{card.label}</p>
                    {Array.isArray(card.value) ? (
                      card.value.map((line) => (
                        <p key={line} className="text-sm font-medium text-heading">{line}</p>
                      ))
                    ) : (
                      <p className="text-sm font-medium text-heading">{card.value}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3 pt-3"
            >
              {socialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent hover:scale-105 transition-all duration-200"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-2xl p-10 shadow-[0_4px_24px_rgba(196,114,74,0.08)]"
            >
              <h3 className="font-serif text-[22px] font-semibold text-heading mb-6">
                Send a Message
              </h3>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  {formFields.slice(0, 2).map((field) => {
                    const Icon = field.icon;
                    return (
                      <div key={field.placeholder} className="relative">
                        <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full pl-11 pr-4 py-3 bg-page border border-border rounded-[10px] text-sm text-heading placeholder-hint focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(196,114,74,0.12)] transition-all duration-200"
                        />
                      </div>
                    );
                  })}
                </div>

                {formFields.slice(2).map((field) => {
                  const Icon = field.icon;
                  if (field.type === "textarea") {
                    return (
                      <div key={field.placeholder} className="relative">
                        <Icon size={16} className="absolute left-3.5 top-3.5 text-accent pointer-events-none" />
                        <textarea
                          placeholder={field.placeholder}
                          rows={4}
                          style={{ height: 120 }}
                          className="w-full pl-11 pr-4 py-3 bg-page border border-border rounded-[10px] text-sm text-heading placeholder-hint focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(196,114,74,0.12)] transition-all duration-200 resize-none"
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={field.placeholder} className="relative">
                      <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full pl-11 pr-4 py-3 bg-page border border-border rounded-[10px] text-sm text-heading placeholder-hint focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(196,114,74,0.12)] transition-all duration-200"
                      />
                    </div>
                  );
                })}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-6 py-3.5 bg-accent text-white text-[15px] font-medium rounded-[10px] hover:bg-[#B5663E] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-80"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </button>

              <p className="text-[12px] text-hint text-center mt-3 flex items-center justify-center gap-1.5">
                <Clock size={12} />
                We typically reply within 24 hours
              </p>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mt-16 rounded-2xl overflow-hidden border border-border h-[400px]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798!2d79.8612!3d6.9147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259251b7dc3e5%3A0xe9c2fb7aca03af4a!2sColombo%2003!5e0!3m2!1sen!2slk!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Artenza Gallery Location"
          />

          <div className="absolute bottom-5 left-5 bg-card border border-border rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.1)] max-w-[220px]">
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={16} className="text-accent shrink-0" />
              <p className="text-sm font-medium text-heading">Artenza Gallery</p>
            </div>
            <p className="text-xs text-muted mb-2">42 Gallery Lane, Colombo 03</p>
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-medium bg-[#FAF0EB] text-accent rounded-full">
              Open Now
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
