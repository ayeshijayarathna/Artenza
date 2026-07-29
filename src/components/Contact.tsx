import { MapPin, Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 bg-charcoal/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Get in Touch
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-linen">
            We&apos;d Love to Hear from You
          </h2>
          <div className="w-16 h-0.5 bg-gold/60 mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input type="text" placeholder="Your Name"
                  className="w-full px-4 py-3 bg-obsidian border border-warm-gray/30 rounded-md text-linen text-sm placeholder-warm-gray focus:outline-none focus:border-gold/50 transition-colors" />
                <input type="email" placeholder="Your Email"
                  className="w-full px-4 py-3 bg-obsidian border border-warm-gray/30 rounded-md text-linen text-sm placeholder-warm-gray focus:outline-none focus:border-gold/50 transition-colors" />
              </div>
              <input type="text" placeholder="Subject"
                className="w-full px-4 py-3 bg-obsidian border border-warm-gray/30 rounded-md text-linen text-sm placeholder-warm-gray focus:outline-none focus:border-gold/50 transition-colors" />
              <textarea rows={5} placeholder="Your Message"
                className="w-full px-4 py-3 bg-obsidian border border-warm-gray/30 rounded-md text-linen text-sm placeholder-warm-gray focus:outline-none focus:border-gold/50 transition-colors resize-none" />
              <button type="submit"
                className="px-8 py-3 bg-gold text-obsidian font-medium rounded-md hover:bg-gold/90 transition-colors text-sm">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-gold mt-1 shrink-0" />
              <div>
                <h4 className="font-serif text-lg font-semibold text-linen mb-1">Visit Us</h4>
                <p className="text-warm-gray text-sm leading-relaxed">
                  42 Gallery Lane, Galle Face<br />
                  Colombo 01, Sri Lanka
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-gold mt-1 shrink-0" />
              <div>
                <h4 className="font-serif text-lg font-semibold text-linen mb-1">Email Us</h4>
                <p className="text-warm-gray text-sm leading-relaxed">
                  hello@artenza.gallery<br />
                  support@artenza.gallery
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-gold mt-1 shrink-0" />
              <div>
                <h4 className="font-serif text-lg font-semibold text-linen mb-1">Call Us</h4>
                <p className="text-warm-gray text-sm leading-relaxed">
                  +94 11 234 5678<br />
                  Mon–Sat, 9AM – 6PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
