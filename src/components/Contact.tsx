"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import Reveal from "./Reveal";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["42 Gallery Lane, Galle Face", "Colombo 01, Sri Lanka"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["hello@artenza.gallery", "support@artenza.gallery"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+94 11 234 5678", "Mon–Sat, 9AM – 6PM"],
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.25em] uppercase font-medium">
            Get in Touch
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-heading mt-3">
            We&apos;d Love to Hear from You
          </h2>
          <div className="w-14 h-0.5 bg-accent mx-auto mt-6" />
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <Reveal className="space-y-10">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.title} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-heading mb-1">
                      {info.title}
                    </h4>
                    {info.lines.map((line) => (
                      <p key={line} className="text-muted text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </Reveal>

          <Reveal delay={0.1}>
            <form className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    placeholder=" "
                    className="peer w-full px-4 pt-5 pb-2 bg-page border border-border rounded-lg text-body text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-4 text-xs text-hint peer-focus:text-accent peer-focus:top-2 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] transition-all"
                  >
                    Your Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder=" "
                    className="peer w-full px-4 pt-5 pb-2 bg-page border border-border rounded-lg text-body text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-4 text-xs text-hint peer-focus:text-accent peer-focus:top-2 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] transition-all"
                  >
                    Your Email
                  </label>
                </div>
              </div>
              <div className="relative">
                <input
                  id="subject"
                  type="text"
                  placeholder=" "
                  className="peer w-full px-4 pt-5 pb-2 bg-page border border-border rounded-lg text-body text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
                <label
                  htmlFor="subject"
                  className="absolute left-4 top-4 text-xs text-hint peer-focus:text-accent peer-focus:top-2 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] transition-all"
                >
                  Subject
                </label>
              </div>
              <div className="relative">
                <textarea
                  id="message"
                  rows={5}
                  placeholder=" "
                  className="peer w-full px-4 pt-5 pb-2 bg-page border border-border rounded-lg text-body text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-4 text-xs text-hint peer-focus:text-accent peer-focus:top-2 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] transition-all"
                >
                  Your Message
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors"
              >
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
