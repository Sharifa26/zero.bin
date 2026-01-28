"use client";

import { useState } from "react";

export default function HomePage() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function createPaste() {
    setError(null);
    setResult(null);

    const body: any = { content };

    if (ttl) body.ttl_seconds = Number(ttl);
    if (maxViews) body.max_views = Number(maxViews);

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setResult(data.url);
  }

  return (
    <main style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1>Create a Paste</h1>

      <textarea
        rows={8}
        style={{ width: "100%" }}
        placeholder="Paste your text here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div style={{ marginTop: 10 }}>
        <input
          type="number"
          placeholder="TTL (seconds, optional)"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          type="number"
          placeholder="Max views (optional)"
          value={maxViews}
          onChange={(e) => setMaxViews(e.target.value)}
        />
      </div>

      <button style={{ marginTop: 15 }} onClick={createPaste}>
        Create Paste
      </button>

      {result && (
        <p style={{ marginTop: 20 }}>
          Shareable link: <br />
          <a href={result}>{result}</a>
        </p>
      )}

      {error && <p style={{ marginTop: 20, color: "red" }}>{error}</p>}
    </main>
  );
}
