const attempts = new Map<string, { count: number; lastAttempt: number }>();

/**
 * Simple in-memory rate limiter.
 * Returns true if the request is allowed, false if blocked.
 */
export function checkRateLimit(
  key: string,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000
): boolean {
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || now - record.lastAttempt > windowMs) {
    attempts.set(key, { count: 1, lastAttempt: now });
    return true;
  }

  if (record.count >= maxAttempts) {
    return false;
  }

  record.count++;
  record.lastAttempt = now;
  return true;
}

export function resetRateLimit(key: string) {
  attempts.delete(key);
}
