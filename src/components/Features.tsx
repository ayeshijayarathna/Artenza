"use client";

import { motion } from "framer-motion";
import { Box, Brush, Shield, Truck, Bell, FileText } from "lucide-react";
import Reveal from "./Reveal";

const features = [
  {
    icon: Box,
    title: "3D Virtual Gallery",
    desc: "Explore immersive gallery rooms from your browser. Walk through curated spaces and view artworks in their intended environment.",
  },
  {
    icon: Brush,
    title: "Custom Art Orders",
    desc: "Have a vision? Submit a custom request, set your budget, and collaborate with artists to bring your idea to life.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    desc: "Buy with confidence. Every transaction is processed through Stripe with full encryption and buyer protection.",
  },
  {
    icon: Truck,
    title: "Real-time Tracking",
    desc: "Follow your order from gallery to doorstep with live tracking updates and estimated delivery dates.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    desc: "Get real-time alerts on order status, commission progress, and exclusive new arrivals.",
  },
  {
    icon: FileText,
    title: "PDF Invoices",
    desc: "Download professional PDF invoices for every purchase. Perfect for records and tax purposes.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.25em] uppercase font-medium">
            Why Artenza
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-heading mt-3">
            Everything You Need
          </h2>
          <p className="text-muted mt-4 max-w-lg mx-auto">
            A complete gallery experience designed for collectors and art lovers.
          </p>
          <div className="w-14 h-0.5 bg-accent mx-auto mt-6" />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}
                  transition={{ duration: 0.2 }}
                  className="bg-card border border-border rounded-2xl p-8 h-full group cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-heading mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
