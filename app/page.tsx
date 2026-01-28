"use client";

import { useState } from "react";

export default function HomePage() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [copied, setCopied] = useState(false);
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
    <div className="container">
      <header className="header">ZeroBin</header>

      <div className="card grid">
        <textarea
          className="textarea"
          placeholder="Paste your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="side">
          <input
            type="number"
            placeholder="Seconds (TTL)"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
            suppressHydrationWarning
          />
          <input
            type="number"
            placeholder="Max Views"
            value={maxViews}
            onChange={(e) => setMaxViews(e.target.value)}
            suppressHydrationWarning
          />
          <button onClick={createPaste}>Create</button>
        </div>
      </div>

      {result && (
        <div className="result">
          <span>Your paste link</span>
          <div className="link">
            <input readOnly value={result} />
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}
