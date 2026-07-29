import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian to-charcoal" />

      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(201,169,110,0.15) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(181,132,106,0.1) 0%, transparent 50%)`,
        }}
      />

      <Navbar />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6 font-medium">
          Art Gallery &amp; Custom Commissions
        </p>

        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-linen leading-tight mb-6">
          Where Art Meets
          <span className="text-gold block">Renaissance</span>
        </h1>

        <p className="text-warm-gray text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Curated artwork from visionary artists. Commission custom pieces that
          speak to your soul. Experience art in a new dimension.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/register"
            className="px-8 py-3 bg-gold text-obsidian font-medium rounded-md hover:bg-gold/90 transition-colors text-sm tracking-wide">
            Explore the Gallery
          </a>
          <a href="#gallery"
            className="px-8 py-3 border border-gold/40 text-gold font-medium rounded-md hover:bg-gold/10 transition-colors text-sm tracking-wide">
            View Collection
          </a>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-warm-gray text-xs tracking-widest uppercase">
          <span>Oil on Canvas</span>
          <span className="w-1 h-1 rounded-full bg-warm-gray" />
          <span>Sculpture</span>
          <span className="w-1 h-1 rounded-full bg-warm-gray" />
          <span>Digital Art</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 text-warm-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
