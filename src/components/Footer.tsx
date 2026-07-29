"use client";

import { useState } from "react";
import { Globe, MessageCircle, Briefcase } from "lucide-react";

const footerLinks = {
  Gallery: ["Explore Artworks", "3D Virtual Tour", "Custom Commissions", "Pricing"],
  Dashboard: ["My Orders", "My Bills", "Notifications", "Profile"],
  Legal: ["Privacy Policy", "Terms of Service", "Shipping Policy", "Refund Policy"],
};

const columns = Object.entries(footerLinks);

export default function Footer() {
  return (
    <footer className="relative bg-[#1E1A17] overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <span className="font-serif text-2xl font-bold text-[#F5EFE6] tracking-wide">
              Artenza
            </span>
            <p className="text-sm text-[#A0917E] mt-3 leading-relaxed">
              Art Gallery &amp; Custom Commissions.
              <br />
              Bringing Renaissance to the modern age.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Globe, MessageCircle, Briefcase].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#3A342F] text-[#A0917E] hover:text-accent hover:border-accent hover:bg-accent/5 transition-all duration-200"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-[#F5EFE6] mb-4 tracking-wide uppercase">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#A0917E] hover:text-accent transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#2A2622] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-[#8C7B6B]">
            &copy; {new Date().getFullYear()} Artenza. All rights reserved.
          </p>
          <p className="text-sm text-[#8C7B6B]">
            Crafted with care in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}
