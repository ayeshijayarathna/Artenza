"use client";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <span className="font-serif text-2xl font-bold text-[#F8EFE6] tracking-wide">
              Artenza
            </span>
            <p className="text-sm text-[#A99A8C] mt-3 leading-relaxed">
              Art Gallery &amp; Custom Commissions.
              <br />
              Bringing Renaissance to the modern age.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Globe, MessageCircle, Briefcase].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#3A302B] text-[#A99A8C] hover:text-accent hover:border-accent hover:bg-accent/5 transition-all duration-200"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-[#F8EFE6] mb-4 tracking-wide uppercase">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#A99A8C] hover:text-accent transition-colors duration-200"
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

      <div className="border-t border-[#3A302B]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-[#A99A8C]/60">
            &copy; {new Date().getFullYear()} Artenza. All rights reserved.
          </p>
          <p className="text-sm text-[#A99A8C]/60">
            Crafted with care in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}
