"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/private-chef", label: "Private Chef" },
  { href: "/the-art", label: "The Art" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--cream)",
        borderBottom: "1px solid rgba(38,32,26,0.1)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.15rem",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Michael Ballash
        </Link>

        {/* Desktop links */}
        <nav
          style={{ display: "flex", gap: "2rem" }}
          className="nav-desktop"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                textDecoration: "none",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="nav-toggle"
          style={{
            background: "none",
            border: "none",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
            display: "none",
          }}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div
          className="nav-mobile-panel"
          style={{
            borderTop: "1px solid rgba(38,32,26,0.1)",
            padding: "1rem var(--gutter) 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                textDecoration: "none",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          .nav-desktop { display: none !important; }
          .nav-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
