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
    <footer>
      <div className="bg-section border-t border-border">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <span className="font-serif text-2xl font-bold text-heading tracking-wide">
                Artenza
              </span>
              <p className="text-sm text-muted mt-3 leading-relaxed">
                Art Gallery &amp; Custom Commissions.
                <br />
                Bringing Renaissance to the modern age.
              </p>
              <div className="flex items-center gap-3 mt-6">
                {[Globe, MessageCircle, Briefcase].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted hover:text-accent hover:border-accent transition-all duration-200"
                    aria-label="Social link"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {columns.map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-semibold text-heading mb-4 tracking-wide uppercase">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted hover:text-accent transition-colors duration-200"
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
      </div>

      <div className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Artenza. All rights reserved.
          </p>
          <p className="text-sm text-muted">Crafted with care in Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
