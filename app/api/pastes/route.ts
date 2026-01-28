import redis from "@/app/lib/redis";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, ttl_seconds, max_views } = body;

    if (!content || typeof content !== "string") {
      return Response.json({ error: "content is required" }, { status: 400 });
    }

    if (
      ttl_seconds !== undefined &&
      (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)
    ) {
      return Response.json(
        { error: "ttl_seconds must be >= 1" },
        { status: 400 },
      );
    }

    if (
      max_views !== undefined &&
      (!Number.isInteger(max_views) || max_views < 1)
    ) {
      return Response.json(
        { error: "max_views must be >= 1" },
        { status: 400 },
      );
    }

    const id = nanoid(8);
    const now = Date.now();

    const expires_at = ttl_seconds ? now + ttl_seconds * 1000 : null;

    const pasteKey = `paste:${id}`;

    const data = {
      content,
      created_at: now,
      expires_at,
      max_views: max_views ?? null,
    };

    await redis.set(pasteKey, JSON.stringify(data));

    if (ttl_seconds) {
      await redis.expire(pasteKey, ttl_seconds);
    }

    await redis.set(`paste:${id}:views`, 0);

    const url = `${new URL(req.url).origin}/p/${id}`;
    console.log("PASTE CREATED:", id);

    return Response.json({ id, url });
  } catch {
    return Response.json({ error: "invalid request" }, { status: 400 });
  }
}
