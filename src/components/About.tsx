import { Palette, Building2, Award } from "lucide-react";

const highlights = [
  {
    icon: Palette,
    title: "Curated Collection",
    desc: "Every piece in our gallery is hand-selected for its artistic merit and emotional resonance.",
  },
  {
    icon: Building2,
    title: "Virtual Gallery",
    desc: "Walk through our 3D gallery spaces from anywhere in the world. Art without boundaries.",
  },
  {
    icon: Award,
    title: "Commission Excellence",
    desc: "Work directly with artists to create custom pieces tailored to your vision and space.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            About Artenza
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-heading">
            A Renaissance for the Modern Age
          </h2>
          <div className="w-16 h-0.5 bg-accent/60 mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title}
                className="bg-card border border-border rounded-lg p-8 text-center hover:border-accent/30 transition-colors group">
                <Icon className="w-10 h-10 text-accent/80 mx-auto mb-5 group-hover:text-accent transition-colors" />
                <h3 className="font-serif text-xl font-semibold text-heading mb-3">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-heading/80 text-lg leading-relaxed font-serif italic">
            &ldquo;Artenza was born from a simple belief — that great art should be
            accessible, personal, and experienced in full dimension. We bridge the
            gap between traditional galleries and the digital future.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
