"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent — we'll be in touch shortly.");
    }, 800);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-section/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Get in Touch
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-heading">
              Let&apos;s talk <span className="italic text-accent">art</span>
            </h2>
            <p className="mt-4 text-body leading-relaxed max-w-lg">
              Interested in a piece, a private viewing, or a custom commission? Our
              advisors would love to hear from you.
            </p>

            <div className="mt-8 space-y-5">
              {[
                { icon: Mail, label: "Email", value: "hello@artenza.art" },
                { icon: Phone, label: "Phone", value: "+94 11 234 5678" },
                { icon: MapPin, label: "Gallery", value: "42 Artists Lane, Colombo 07" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-accent/10 text-accent shrink-0">
                    <c.icon size={20} />
                  </span>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider">{c.label}</p>
                    <p className="text-body font-medium mt-0.5">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-soft space-y-5"
          >
            <Input
              label="Your Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div>
              <label className="text-sm font-medium text-heading">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="Tell us about the piece you're looking for…"
                className="mt-2 w-full rounded-xl border border-border bg-page px-4 py-3 text-sm text-body placeholder:text-muted focus:outline-none focus:border-accent focus:ring-[3px] focus:ring-accent/15 transition-all duration-200 resize-none"
              />
            </div>
            <Button type="submit" className="w-full" size="lg" isLoading={sending} rightIcon={<Send size={16} />}>
              Send Message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
