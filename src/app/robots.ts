import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * AI crawler policy (GEO):
 *  - ALLOW search/retrieval + user-triggered fetch bots → keeps Technema citable
 *    in live AI answers (ChatGPT Search, Perplexity, Claude, etc.).
 *  - DISALLOW training-only bots → opts content out of model training corpora.
 *  Standard crawlers (Googlebot, Bingbot, …) are covered by "*".
 */
const ALLOWED_AI_BOTS = [
  "OAI-SearchBot", // OpenAI ChatGPT Search index
  "ChatGPT-User", // OpenAI on-demand fetch (user asked)
  "PerplexityBot", // Perplexity index
  "Perplexity-User", // Perplexity on-demand fetch
  "Claude-SearchBot", // Anthropic search index
  "Claude-User", // Anthropic on-demand fetch
  "Applebot", // Apple / Siri search (NOT Applebot-Extended)
];

const BLOCKED_AI_BOTS = [
  "GPTBot", // OpenAI model training
  "ClaudeBot", // Anthropic model training
  "anthropic-ai", // Anthropic (legacy training)
  "CCBot", // Common Crawl
  "Google-Extended", // Gemini training opt-out token
  "Applebot-Extended", // Apple AI training opt-out token
  "Bytespider", // ByteDance / TikTok training
  "Meta-ExternalAgent", // Meta AI training
  "Amazonbot", // Amazon
  "PetalBot", // Huawei
  "Diffbot", // Diffbot
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Search/retrieval + user-fetch AI bots — allowed (minus private areas).
      {
        userAgent: ALLOWED_AI_BOTS,
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Training-only AI bots — fully disallowed.
      {
        userAgent: BLOCKED_AI_BOTS,
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
