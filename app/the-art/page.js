import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "The Art — Michael Ballash",
  description:
    "Original paintings by Michael Ballash, Miami chef and artist. Twenty years of work, for sale for the first time. Inquire to purchase.",
};

// Revalidate periodically so Michael/Taylor's admin edits show up without a redeploy
export const revalidate = 60;

export default async function TheArtPage() {
  const { data: paintings } = await supabase
    .from("paintings")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  return (
    <main>
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <span className="eyebrow">The Art</span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>
            I've painted for twenty years and kept every piece.
          </h1>
          <p>This is the first time the work has been for sale.</p>
          <p>
            Some pieces are precise and layered, some fast and gestural, all the same
            hand.
          </p>
          <p style={{ fontStyle: "italic" }}>
            Every painting is one of a kind. When it's gone, it's gone.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {!paintings || paintings.length === 0 ? (
            <p style={{ color: "var(--terracotta)" }}>
              The gallery is being curated — check back soon.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2.5rem",
              }}
            >
              {paintings.map((p) => (
                <div key={p.id}>
                  <div
                    style={{
                      aspectRatio: "4/5",
                      backgroundImage: `url(${p.image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "2px",
                      marginBottom: "0.85rem",
                    }}
                  />
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "0.2rem" }}>
                    {p.title}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 0.6rem 0",
                      fontSize: "0.9rem",
                      color: "var(--terracotta)",
                    }}
                  >
                    {[p.medium, p.dimensions, p.year].filter(Boolean).join(" · ")}
                  </p>
                  {p.story && (
                    <p style={{ fontSize: "0.95rem", marginBottom: "0.75rem" }}>
                      {p.story}
                    </p>
                  )}
                  <Link
                    href={`/contact?piece=${encodeURIComponent(p.title)}`}
                    className="btn btn-ghost"
                    style={{ padding: "0.5rem 1.1rem", fontSize: "0.85rem" }}
                  >
                    Inquire to Purchase
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
