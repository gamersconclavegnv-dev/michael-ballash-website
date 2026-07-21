import Link from "next/link";
import CollageHero from "@/components/CollageHero";

export default function HomePage() {
  return (
    <main>
      {/* HERO — 15-photo mosaic collage (food + art), name, title, two doors */}
      <section style={{ position: "relative" }}>
        <CollageHero />
        <div
          className="container"
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            transform: "translateX(-50%)",
            width: "100%",
            paddingBottom: "clamp(2.5rem, 6vw, 5rem)",
            color: "var(--cream)",
          }}
        >
          <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)", color: "var(--cream)" }}>
            Michael Ballash
          </h1>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              marginBottom: "2rem",
              color: "var(--cream)",
            }}
          >
            Private Chef &amp; Artist — Miami
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/private-chef" className="btn btn-solid">
              Book a Dinner
            </Link>
            <Link
              href="/the-art"
              className="btn"
              style={{ borderColor: "var(--cream)", color: "var(--cream)" }}
            >
              See the Art
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT — below the fold, exact copy from the brief */}
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <span className="eyebrow">About</span>
          <p>
            I'm a chef in the Miami Design District, junior sous chef for Le Jardinier
            and L'Atelier, kitchens holding one and two Michelin stars. I started in
            Orlando at sixteen and came up station by station, next to people who were
            better than me. Chef Mary at Kres ChopHouse took me under her wing early,
            and a lot of how I cook still traces back to her.
          </p>
          <p>
            I've been painting even longer. More than 400 pieces over twenty years,
            kept for myself until now.
          </p>
          <p style={{ fontStyle: "italic" }}>
            Cooking and painting are the same practice: composition, color, knowing
            when to stop.
          </p>
        </div>
      </section>
    </main>
  );
}