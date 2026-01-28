"use client";

import { useState } from "react";

export default function PasteActions({
  content,
  remainingViews,
}: {
  content: string;
  remainingViews: number | null;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="side">
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(content);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>

      <div className="badge">
        {remainingViews === null
          ? "Unlimited Views"
          : `Remaining: ${remainingViews}`}
      </div>
    </div>
  );
}
