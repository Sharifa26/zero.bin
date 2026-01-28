import { notFound } from "next/navigation";
import { headers } from "next/headers";
import PasteActions from "./PasteActions";

async function getPaste(id: string) {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";

  const res = await fetch(`${proto}://${host}/api/pastes/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paste = await getPaste(id);
  if (!paste) notFound();

  return (
    <div className="container">
      <header className="header">ZeroBin</header>

      <div className="card grid">
        <pre className="view">{paste.content}</pre>

        {/* pass remaining views */}
        <PasteActions
          content={paste.content}
          remainingViews={paste.remaining_views}
        />
      </div>
    </div>
  );
}
