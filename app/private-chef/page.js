import Link from "next/link";

export const metadata = {
  title: "Private Chef Miami — Michael Ballash",
  description:
    "Hire Michael Ballash for private dinners, events, and weekly meals in Miami. Sourcing and technique from Michelin-starred kitchens, cooked in your kitchen.",
};

const credentials = [
  {
    place: "Le Jardinier, Miami",
    detail: "One Michelin star. Line 2023–2025; returned as junior sous chef, Dec 2025 to present.",
  },
  {
    place: "L'Atelier de Joël Robuchon, Miami",
    detail: "Two Michelin stars. 2022–2023; junior sous chef, Dec 2025 to present.",
  },
  {
    place: "Claudie, Miami",
    detail: "Chef de partie, 2025. Ran production and a prep team of ten.",
  },
  {
    place: "Kres ChopHouse, Orlando",
    detail: "2020–2022. Ran the closing shift at 22.",
  },
];

const events = [
  "Wedding dinner service",
  "60th and 80th birthday celebrations",
  "Private dining at the Ocean Reef Club, Key Largo",
];

const plates = [
  "salmon-caviar",
  "burrata-peach",
  "white-asparagus",
  "langoustine-red-green",
  "berry-dessert",
  "crudo-green-bowl",
];

export default function PrivateChefPage() {
  return (
    <main>
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <span className="eyebrow">Private Chef</span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>
            Hire me and your only job is to sit down.
          </h1>
          <p>
            I plan the menu around you, shop for it myself, and cook and plate it in
            your kitchen the way I would at the restaurant. Sourcing for Michelin
            kitchens taught me where to find ingredients most people can't.
          </p>
          <p>
            Dinners, events, weekly meals. Your home, your boat, wherever the table is.
          </p>
          <Link href="/contact" className="btn btn-solid">
            Book a Dinner
          </Link>
        </div>
      </section>

      {/* Plate gallery */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {plates.map((slug) => (
              <div
                key={slug}
                style={{
                  aspectRatio: "4/5",
                  backgroundImage: `url(/images/${slug}.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "2px",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CV / credentials — doubles as the site's only CV, per the brief */}
      <section className="section" style={{ borderTop: "1px solid rgba(38,32,26,0.12)" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <span className="eyebrow">Where I've Cooked</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {credentials.map((c) => (
              <div key={c.place}>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "0.25rem" }}>{c.place}</h3>
                <p style={{ margin: 0, color: "var(--terracotta)" }}>{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private events */}
      <section className="section" style={{ borderTop: "1px solid rgba(38,32,26,0.12)" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <span className="eyebrow">Private Events</span>
          <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
            {events.map((e) => (
              <li key={e} style={{ marginBottom: "0.5rem" }}>
                {e}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Event proof photo */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            style={{
              aspectRatio: "21/9",
              backgroundImage: "url(/images/event-nine-plates.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "2px",
            }}
          />
        </div>
      </section>

      {/* Testimonials — placeholder until delivered */}
      <section className="section" style={{ borderTop: "1px solid rgba(38,32,26,0.12)" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <span className="eyebrow">What People Say</span>
          <p style={{ color: "var(--terracotta)", fontStyle: "italic" }}>
            Testimonials from a wedding, milestone birthdays, and the Ocean Reef Club
            are on the way — this section will update once Taylor delivers them.
          </p>
        </div>
      </section>

      {/* Availability */}
      <section
        className="section"
        style={{ borderTop: "1px solid rgba(38,32,26,0.12)", textAlign: "center" }}
      >
        <div className="container" style={{ maxWidth: 640, margin: "0 auto" }}>
          <span className="eyebrow" style={{ textAlign: "center" }}>Availability</span>
          <h2>Based in Miami. One dinner or a full season, here or anywhere.</h2>
          <Link href="/contact" className="btn btn-solid">
            Book a Dinner
          </Link>
        </div>
      </section>
    </main>
  );
}
