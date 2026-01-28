import { notFound } from "next/navigation";
import { headers } from "next/headers";

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

  return <pre style={{ whiteSpace: "pre-wrap" }}>{paste.content}</pre>;
}
