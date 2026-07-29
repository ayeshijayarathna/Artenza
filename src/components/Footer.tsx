export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-warm-gray/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-serif text-xl font-bold text-gold tracking-wide">ARTENZA</span>
            <p className="text-warm-gray text-xs mt-1">Art Gallery &amp; Custom Commissions</p>
          </div>

          <div className="flex items-center gap-6 text-xs text-warm-gray">
            <a href="#hero" className="hover:text-gold transition-colors">Home</a>
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </div>

          <p className="text-warm-gray text-xs">
            &copy; {new Date().getFullYear()} Artenza. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
