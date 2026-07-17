"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const pieceFromQuery = searchParams.get("piece") || "";

  const [mode, setMode] = useState(pieceFromQuery ? "art" : "dinner");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    location: "",
    guests: "",
    occasion: "",
    piece: pieceFromQuery,
    message: "",
  });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, ...form }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <main className="section">
        <div className="container" style={{ maxWidth: 560 }}>
          <span className="eyebrow">Contact</span>
          <h1>Got it.</h1>
          <p>
            {mode === "dinner"
              ? "Thanks for reaching out — I'll get back to you within a day to plan the menu."
              : "Thanks for your interest — I'll follow up shortly about this piece."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 560 }}>
        <span className="eyebrow">Contact</span>
        <h1>Michael Ballash</h1>
        <p>
          <a href="tel:9546518848" style={{ textDecoration: "none" }}>
            Call or text: 954-651-8848
          </a>
          <br />
          <a href="mailto:Mballash99@gmail.com" style={{ textDecoration: "none" }}>
            Mballash99@gmail.com
          </a>
        </p>
        <p>Miami Design District. Will travel.</p>

        <p style={{ fontStyle: "italic", marginTop: "2rem" }}>
          Tell me about your dinner and I'll get back to you within a day to plan the
          menu.
        </p>

        {/* Toggle */}
        <div style={{ display: "flex", gap: "0.75rem", margin: "1.5rem 0" }}>
          <button
            type="button"
            onClick={() => setMode("dinner")}
            className="btn"
            style={
              mode === "dinner"
                ? { background: "var(--tomato)", color: "var(--cream)" }
                : { borderColor: "var(--espresso)", color: "var(--espresso)" }
            }
          >
            Book a Dinner
          </button>
          <button
            type="button"
            onClick={() => setMode("art")}
            className="btn"
            style={
              mode === "art"
                ? { background: "var(--tomato)", color: "var(--cream)" }
                : { borderColor: "var(--espresso)", color: "var(--espresso)" }
            }
          >
            Ask About a Painting
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Field label="Name" required value={form.name} onChange={(v) => update("name", v)} />
          <Field label="Email" type="email" required value={form.email} onChange={(v) => update("email", v)} />
          <Field label="Phone (optional)" value={form.phone} onChange={(v) => update("phone", v)} />

          {mode === "dinner" ? (
            <>
              <Field label="Date" value={form.date} onChange={(v) => update("date", v)} />
              <Field label="Location" value={form.location} onChange={(v) => update("location", v)} />
              <Field label="Number of guests" value={form.guests} onChange={(v) => update("guests", v)} />
              <Field label="Occasion" value={form.occasion} onChange={(v) => update("occasion", v)} />
              <Field
                label="Anything else"
                textarea
                value={form.message}
                onChange={(v) => update("message", v)}
              />
            </>
          ) : (
            <>
              <Field
                label="Which piece"
                required
                value={form.piece}
                onChange={(v) => update("piece", v)}
              />
              <Field label="Message" textarea value={form.message} onChange={(v) => update("message", v)} />
            </>
          )}

          <button type="submit" className="btn btn-solid" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send"}
          </button>
          {status === "error" && (
            <p style={{ color: "var(--tomato)" }}>
              Something went wrong — try again, or text 954-651-8848 directly.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, type = "text", required = false, textarea = false }) {
  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    border: "1px solid rgba(38,32,26,0.3)",
    borderRadius: "2px",
    background: "var(--cream)",
    color: "var(--espresso)",
  };
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.9rem" }}>
      {label}
      {textarea ? (
        <textarea
          rows={4}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
        />
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
        />
      )}
    </label>
  );
}
