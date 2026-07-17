"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 380 }}>
        <span className="eyebrow">Admin</span>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "0.75rem",
              border: "1px solid rgba(38,32,26,0.3)",
              borderRadius: "2px",
              background: "var(--cream)",
              color: "var(--espresso)",
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
            }}
          />
          <button type="submit" className="btn btn-solid">
            Sign in
          </button>
          {error && <p style={{ color: "var(--tomato)" }}>{error}</p>}
        </form>
      </div>
    </main>
  );
}
