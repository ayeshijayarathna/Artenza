const team = [
  {
    name: "Elena Vasquez",
    role: "Gallery Director & Curator",
    bio: "With over 15 years in fine art curation, Elena brings an eye for emerging talent and a passion for cross-boundary expression.",
  },
  {
    name: "James Okonkwo",
    role: "Lead Curator",
    bio: "James specializes in contemporary African and diaspora art, building bridges between traditional techniques and modern narratives.",
  },
  {
    name: "Priya Sharma",
    role: "Commission Artist",
    bio: "Priya works across oil, watercolor, and digital mediums, creating bespoke pieces that capture her clients&apos; deepest visions.",
  },
  {
    name: "Liam O&apos;Connor",
    role: "3D Gallery Architect",
    bio: "Liam architects our virtual spaces, ensuring every digital gallery room feels as intentional as its physical counterpart.",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Our Team
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-heading">
            The People Behind the Gallery
          </h2>
          <div className="w-16 h-0.5 bg-accent/60 mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name}
              className="bg-card border border-border rounded-lg p-6 text-center hover:border-accent/30 transition-colors">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent text-2xl font-serif">{member.name[0]}</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-heading mb-1">{member.name}</h3>
              <p className="text-accent text-xs tracking-wider uppercase mb-3">{member.role}</p>
              <p className="text-muted text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
