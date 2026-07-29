"use client";

import { motion } from "framer-motion";
import { Eye, Palette, Shield, Truck, Bell, FileText } from "lucide-react";

const features = [
  { icon: Eye, title: "3D Virtual Gallery", text: "Explore our collection from anywhere with immersive 3D walkthroughs." },
  { icon: Palette, title: "Custom Art Orders", text: "Commission bespoke pieces tailored to your vision and space." },
  { icon: Shield, title: "Secure Payments", text: "Shop with confidence using encrypted, hassle-free transactions." },
  { icon: Truck, title: "Real-time Tracking", text: "Monitor your order from studio to doorstep with live updates." },
  { icon: Bell, title: "Notifications", text: "Stay informed about new arrivals, order status, and exclusive events." },
  { icon: FileText, title: "PDF Invoices", text: "Receive detailed digital invoices for every purchase seamlessly." },
];

export default function Features() {
  return (
    <section id="features" className="relative py-28 bg-section overflow-hidden">
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
            Why Artenza
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-heading mt-4 leading-tight">
            A Premium Art
            <br />
            <span className="text-accent">Experience</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-accent/30 mx-auto mt-6" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-7 sm:p-8 hover:-translate-y-1.5 hover:shadow-glow transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-heading mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {feat.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
