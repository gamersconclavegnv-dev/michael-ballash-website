"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    dimensions: "",
    medium: "",
    year: "",
    story: "",
  });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    dimensions: "",
    medium: "",
    year: "",
    story: "",
  });
  const [editSaving, setEditSaving] = useState(false);
  const router = useRouter();

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/paintings");
    const data = await res.json();
    setPaintings(data.paintings || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!file) return alert("Please choose an image.");
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("image", file);

    const res = await fetch("/api/admin/paintings", { method: "POST", body: fd });
    setSaving(false);
    if (res.ok) {
      setForm({ title: "", dimensions: "", medium: "", year: "", story: "" });
      setFile(null);
      load();
    } else {
      alert("Failed to add painting.");
    }
  }

  async function togglePublish(p) {
    await fetch(`/api/admin/paintings/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: !p.is_published }),
    });
    load();
  }

  async function handleDelete(p) {
    if (!confirm(`Delete "${p.title}"? This can't be undone.`)) return;
    await fetch(`/api/admin/paintings/${p.id}`, { method: "DELETE" });
    load();
  }

  function startEditing(p) {
    setEditingId(p.id);
    setEditForm({
      title: p.title || "",
      dimensions: p.dimensions || "",
      medium: p.medium || "",
      year: p.year || "",
      story: p.story || "",
    });
  }

  function cancelEditing() {
    setEditingId(null);
  }

  async function saveEdit(id) {
    setEditSaving(true);
    const res = await fetch(`/api/admin/paintings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editForm.title,
        dimensions: editForm.dimensions,
        medium: editForm.medium,
        year: editForm.year ? Number(editForm.year) : null,
        story: editForm.story,
      }),
    });
    setEditSaving(false);
    if (res.ok) {
      setEditingId(null);
      load();
    } else {
      alert("Failed to save changes.");
    }
  }

  async function handleLogout() {
    document.cookie = "mb_admin_session=; Max-Age=0; path=/";
    router.push("/admin/login");
  }

  return (
    <main className="section">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span className="eyebrow">Admin</span>
            <h1>Gallery</h1>
          </div>
          <button onClick={handleLogout} className="btn btn-ghost">
            Sign out
          </button>
        </div>

        {/* Add new painting */}
        <form
          onSubmit={handleAdd}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            margin: "2rem 0",
            padding: "1.5rem",
            border: "1px solid rgba(38,32,26,0.15)",
            borderRadius: "4px",
          }}
        >
          <h3 style={{ gridColumn: "1 / -1", marginBottom: 0 }}>Add a painting</h3>
          <input
            placeholder="Title"
            required
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            style={inputStyle}
          />
          <input
            placeholder="Dimensions (e.g. 30x40 in)"
            value={form.dimensions}
            onChange={(e) => setForm((f) => ({ ...f, dimensions: e.target.value }))}
            style={inputStyle}
          />
          <input
            placeholder="Medium (e.g. Oil on canvas)"
            value={form.medium}
            onChange={(e) => setForm((f) => ({ ...f, medium: e.target.value }))}
            style={inputStyle}
          />
          <input
            placeholder="Year"
            value={form.year}
            onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
            style={inputStyle}
          />
          <textarea
            placeholder="One-sentence story (optional)"
            value={form.story}
            onChange={(e) => setForm((f) => ({ ...f, story: e.target.value }))}
            style={{ ...inputStyle, gridColumn: "1 / -1" }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ gridColumn: "1 / -1" }}
          />
          <button type="submit" className="btn btn-solid" disabled={saving} style={{ gridColumn: "1 / -1" }}>
            {saving ? "Uploading…" : "Add painting"}
          </button>
        </form>

        {/* Existing paintings */}
        {loading ? (
          <p>Loading…</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {paintings.map((p) => (
              <div
                key={p.id}
                style={{
                  border: "1px solid rgba(38,32,26,0.15)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  opacity: p.is_published ? 1 : 0.5,
                }}
              >
                <div
                  style={{
                    aspectRatio: "4/5",
                    backgroundImage: `url(${p.image_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div style={{ padding: "0.85rem" }}>
                  {editingId === p.id ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <input
                        placeholder="Title"
                        value={editForm.title}
                        onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                        style={{ ...inputStyle, fontSize: "0.85rem", padding: "0.5rem" }}
                      />
                      <input
                        placeholder="Dimensions"
                        value={editForm.dimensions}
                        onChange={(e) => setEditForm((f) => ({ ...f, dimensions: e.target.value }))}
                        style={{ ...inputStyle, fontSize: "0.85rem", padding: "0.5rem" }}
                      />
                      <input
                        placeholder="Medium"
                        value={editForm.medium}
                        onChange={(e) => setEditForm((f) => ({ ...f, medium: e.target.value }))}
                        style={{ ...inputStyle, fontSize: "0.85rem", padding: "0.5rem" }}
                      />
                      <input
                        placeholder="Year"
                        value={editForm.year}
                        onChange={(e) => setEditForm((f) => ({ ...f, year: e.target.value }))}
                        style={{ ...inputStyle, fontSize: "0.85rem", padding: "0.5rem" }}
                      />
                      <textarea
                        placeholder="Story"
                        value={editForm.story}
                        onChange={(e) => setEditForm((f) => ({ ...f, story: e.target.value }))}
                        style={{ ...inputStyle, fontSize: "0.85rem", padding: "0.5rem" }}
                      />
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => saveEdit(p.id)}
                          className="btn btn-solid"
                          disabled={editSaving}
                          style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                        >
                          {editSaving ? "Saving…" : "Save"}
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="btn btn-ghost"
                          style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <strong>{p.title}</strong>
                      <p style={{ fontSize: "0.85rem", color: "var(--terracotta)", margin: "0.25rem 0 0.75rem" }}>
                        {[p.medium, p.dimensions, p.year].filter(Boolean).join(" · ")}
                      </p>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button onClick={() => startEditing(p)} className="btn btn-ghost" style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}>
                          Edit
                        </button>
                        <button onClick={() => togglePublish(p)} className="btn btn-ghost" style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}>
                          {p.is_published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="btn"
                          style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem", borderColor: "var(--tomato)", color: "var(--tomato)" }}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

const inputStyle = {
  padding: "0.7rem",
  border: "1px solid rgba(38,32,26,0.3)",
  borderRadius: "2px",
  background: "var(--cream)",
  color: "var(--espresso)",
  fontFamily: "var(--font-body)",
  fontSize: "0.95rem",
};