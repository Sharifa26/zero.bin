import redis from "@/app/lib/redis";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const pasteKey = `paste:${id}`;
  const viewsKey = `paste:${id}:views`;

  const raw = await redis.get(pasteKey);
  if (!raw) {
    return Response.json({ error: "not found" }, { status: 404 });
  }

  const paste = JSON.parse(raw);

  const isTest = process.env.TEST_MODE === "1";
  const headerNow = req.headers.get("x-test-now-ms");

  const now = isTest && headerNow ? Number(headerNow) : Date.now();

  if (paste.expires_at && now >= paste.expires_at) {
    return Response.json({ error: "expired" }, { status: 404 });
  }

  const views = Number(await redis.get(viewsKey)) || 0;

  if (paste.max_views !== null && views >= paste.max_views) {
    return Response.json({ error: "view limit exceeded" }, { status: 404 });
  }

  const newViews = await redis.incr(viewsKey);

  const remaining_views =
    paste.max_views === null ? null : Math.max(paste.max_views - newViews, 0);

  return Response.json({
    content: paste.content,
    remaining_views,
    expires_at: paste.expires_at
      ? new Date(paste.expires_at).toISOString()
      : null,
  });
}
