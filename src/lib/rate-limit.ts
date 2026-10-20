import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const memory = new Map<string, { count: number; resetAt: number }>();
const windowMs = 60_000;

export async function checkOrderRateLimit(identifier: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    const limiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(Number(process.env.RATE_LIMIT_ORDERS_PER_MINUTE ?? 5), "1 m"),
      analytics: true,
      prefix: "chickadys:orders",
    });
    return limiter.limit(identifier);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Distributed rate limiting is not configured.");
  }

  const now = Date.now();
  const current = memory.get(identifier);
  if (!current || current.resetAt <= now) {
    memory.set(identifier, { count: 1, resetAt: now + windowMs });
    return { success: true, limit: 5, remaining: 4, reset: now + windowMs };
  }
  current.count += 1;
  return { success: current.count <= 5, limit: 5, remaining: Math.max(0, 5 - current.count), reset: current.resetAt };
}
