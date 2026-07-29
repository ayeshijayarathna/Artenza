import { ArrowRight } from "lucide-react";

const artworks = [
  {
    title: "Whispers of the East",
    artist: "Amaya Perera",
    price: "$2,400",
    img: "/artwork-1.jpg",
    medium: "Oil on Canvas",
  },
  {
    title: "Urban Solitude",
    artist: "Marcus Chen",
    price: "$1,800",
    img: "/artwork-2.jpg",
    medium: "Mixed Media",
  },
  {
    title: "Eternal Bloom",
    artist: "Sofia Reyes",
    price: "$3,200",
    img: "/artwork-3.jpg",
    medium: "Digital Print",
  },
  {
    title: "Golden Horizon",
    artist: "Ravi Kumar",
    price: "$1,600",
    img: "/artwork-4.jpg",
    medium: "Acrylic on Canvas",
  },
];

export default function GalleryPreview() {
  return (
    <section id="gallery" className="py-24 px-4 bg-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Explore Gallery
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-heading">
            Featured Artworks
          </h2>
          <div className="w-16 h-0.5 bg-accent/60 mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artworks.map((art) => (
            <div key={art.title}
              className="bg-card border border-border rounded-lg overflow-hidden group hover:border-accent/30 transition-all">
              <div className="aspect-[3/4] bg-section flex items-center justify-center">
                <div className="text-muted text-sm p-4 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent text-2xl font-serif">{art.title[0]}</span>
                  </div>
                  <p className="text-xs text-hint">Artwork preview</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-base font-semibold text-heading mb-1 truncate">{art.title}</h3>
                <p className="text-muted text-xs mb-2">{art.artist} · {art.medium}</p>
                <div className="flex items-center justify-between">
                  <span className="text-accent text-sm font-medium">{art.price}</span>
                  <a href="/login"
                    className="text-xs text-hint hover:text-accent transition-colors flex items-center gap-1">
                    Buy <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent/40 text-accent rounded-md hover:bg-accent/5 transition-colors text-sm">
            View Full Gallery <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
