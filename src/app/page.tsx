import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Gallery, { ArtworkCard } from "@/components/home/Gallery";
import Features from "@/components/home/Features";
import Team from "@/components/home/Team";
import Contact from "@/components/home/Contact";

async function getFeaturedArtworks() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/artworks?featured=true&limit=6&sort=-createdAt`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.artworks || []) as ArtworkCard[];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const artworks = await getFeaturedArtworks();

  return (
    <>
      <Hero />
      <About />
      <Gallery artworks={artworks} />
      <Features />
      <Team />
      <Contact />
    </>
  );
}
