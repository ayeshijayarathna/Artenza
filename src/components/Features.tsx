import { Box, ShoppingCart, Shield, Palette, Sparkles, Headphones } from "lucide-react";

const features = [
  {
    icon: Box,
    title: "3D Virtual Gallery",
    desc: "Explore immersive gallery rooms from your browser. Walk through curated spaces and view artworks in their intended environment.",
  },
  {
    icon: ShoppingCart,
    title: "Secure Purchases",
    desc: "Buy with confidence. Every transaction is processed through Stripe with full encryption and buyer protection.",
  },
  {
    icon: Palette,
    title: "Custom Commissions",
    desc: "Have a vision? Submit a custom request, set your budget, and collaborate with artists to bring your idea to life.",
  },
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    desc: "Every original piece comes with a verified certificate of authenticity and detailed provenance tracking.",
  },
  {
    icon: Sparkles,
    title: "Real-Time Updates",
    desc: "Get instant notifications on order status, commission progress, and new arrivals — delivered straight to your dashboard.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "From browsing to delivery, our team is with you every step. Reach out anytime for personalized assistance.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Why Artenza
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-linen">
            Everything You Need
          </h2>
          <p className="text-warm-gray mt-4 max-w-xl mx-auto">
            A complete gallery experience designed for collectors and art lovers.
          </p>
          <div className="w-16 h-0.5 bg-gold/60 mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title}
                className="bg-charcoal/60 border border-warm-gray/20 rounded-lg p-6 hover:border-gold/30 transition-colors group">
                <Icon className="w-8 h-8 text-terracotta mb-4 group-hover:text-gold transition-colors" />
                <h3 className="font-serif text-lg font-semibold text-linen mb-2">{feature.title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
