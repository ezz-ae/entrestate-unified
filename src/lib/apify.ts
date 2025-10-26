
import { ApifyClient } from 'apify-client';

export function getApifyClient() {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) {
    throw new Error("Missing APIFY_API_TOKEN in environment");
  }
  return new ApifyClient({ token });
}
