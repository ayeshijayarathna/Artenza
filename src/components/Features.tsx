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
    <section id="features" className="py-24 bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-heading mt-3">
            A Premium Art Experience
          </h2>
          <div className="w-14 h-0.5 bg-accent mx-auto mt-5" />
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
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card border border-border rounded-2xl p-6 sm:p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-heading mb-2">
                  {feat.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {feat.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
