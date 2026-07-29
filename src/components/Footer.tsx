"use client";

import { Globe, MessageCircle, Briefcase } from "lucide-react";

const footerLinks = {
  Gallery: ["Explore Artworks", "3D Virtual Tour", "Custom Commissions", "Pricing"],
  Dashboard: ["My Orders", "My Bills", "Notifications", "Profile"],
  Legal: ["Privacy Policy", "Terms of Service", "Shipping Policy", "Refund Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-heading text-linen/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <span className="font-serif text-2xl font-bold text-linen tracking-wide">Artenza</span>
            <p className="text-sm text-linen/50 mt-2 leading-relaxed">
              Art Gallery &amp; Custom Commissions.
              <br />
              Bringing Renaissance to the modern age.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="text-accent hover:text-accent-hover transition-colors" aria-label="Globe">
                <Globe size={18} />
              </a>
              <a href="#" className="text-accent hover:text-accent-hover transition-colors" aria-label="Message">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="text-accent hover:text-accent-hover transition-colors" aria-label="Briefcase">
                <Briefcase size={18} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif text-base font-semibold text-linen mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-linen/50 hover:text-accent transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-linen/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-linen/40">
            &copy; {new Date().getFullYear()} Artenza. All rights reserved.
          </p>
          <p className="text-xs text-linen/40">
            Crafted with care in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}
