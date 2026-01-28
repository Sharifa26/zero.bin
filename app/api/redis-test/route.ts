import redis from "@/app/lib/redis";

export async function GET() {
  try {
    // write
    await redis.set("redis:test", "it-works");

    // read
    const value = await redis.get("redis:test");

    return Response.json({
      ok: true,
      value,
    });
  } catch (error) {
    return Response.json(
      { ok: false, error: "Redis not connected" },
      { status: 500 },
    );
  }
}
