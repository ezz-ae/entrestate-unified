
'use server';

import type { Market } from "@/types";
import { getAdminAuth } from "./firebaseAdmin";
import { GoogleGenerativeAI } from "@google/generative-ai";

const NEWS_API_KEY = process.env.NEWS_API_KEY; // You'll need to get an API key from a news provider
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function ok<T>(data: T, init: number = 200) {
  return Response.json({ ok: true, data }, { status: init });
}
export async function bad(message = "Bad Request", init: number = 400) {
  return Response.json({ ok: false, error: message }, { status: init });
}
export async function fail(error: any, code = 500) {
  console.error('[API FAIL]', error);
  // Avoid leaking detailed internal errors to the client
  const message = typeof error === 'string' ? error : (error?.message || "An internal server error occurred.");
  return Response.json({ ok: false, error: message }, { status: code });
}

/**
 * Extracts the user's UID from the Authorization header of a request.
 * @param req The incoming Request object.
 * @returns The UID of the authenticated user, or null if not authenticated.
 */
export async function getUidFromRequest(req: Request): Promise<string | null> {
    const adminAuth = getAdminAuth();
    if (!adminAuth) {
        console.error("Firebase Admin Auth is not initialized. Cannot verify ID token.");
        return null;
    }
    try {
        const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];
        if (!idToken) {
            return null;
        }
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        return decodedToken.uid;
    } catch (error) {
        console.error("Error verifying ID token:", error);
        return null;
    }
}

/**
 * Fetches and summarizes news articles for a given real estate market.
 * @param market The market to fetch news for.
 * @returns A summary of the latest news and sentiment analysis.
 */
export async function getNews(market: Market) {
  if (!NEWS_API_KEY) {
    console.warn("NEWS_API_KEY not configured. Skipping news fetching.");
    return { summary: "News service is not configured.", sentiment: "neutral" };
  }

  try {
    const query = `"${market.name}" real estate`;
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${NEWS_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`News API request failed with status ${response.status}`);
    }
    const data = await response.json();
    const articles = data.articles.slice(0, 5).map((article: any) => ({
      title: article.title,
      content: article.content,
    }));

    if (articles.length === 0) {
      return { summary: "No recent news found for this market.", sentiment: "neutral" };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
      The following are recent news articles about the ${market.name} real estate market.
      Please provide a concise summary of the key trends and a sentiment analysis (positive, negative, or neutral).

      Articles:
      ${articles.map((a:any) => `Title: ${a.title}\nContent: ${a.content}`).join('\n\n')}
    `;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Simple sentiment extraction (can be improved with a more sophisticated model)
    let sentiment = "neutral";
    if (text.toLowerCase().includes("positive")) {
      sentiment = "positive";
    } else if (text.toLowerCase().includes("negative")) {
      sentiment = "negative";
    }

    return { summary: text, sentiment };
  } catch (error) {
    console.error("Error fetching or summarizing news:", error);
    return { summary: "Could not fetch or analyze market news.", sentiment: "neutral" };
  }
}
