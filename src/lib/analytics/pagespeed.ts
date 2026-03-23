export interface CoreWebVitals {
  performanceScore: number;
  lcp: { value: number; rating: "good" | "needs-improvement" | "poor" };
  cls: { value: number; rating: "good" | "needs-improvement" | "poor" };
  fcp: { value: number; rating: "good" | "needs-improvement" | "poor" };
  tbt: { value: number; rating: "good" | "needs-improvement" | "poor" };
  si: { value: number; rating: "good" | "needs-improvement" | "poor" };
}

function getRating(id: string, value: number): "good" | "needs-improvement" | "poor" {
  const thresholds: Record<string, [number, number]> = {
    "largest-contentful-paint": [2500, 4000],
    "cumulative-layout-shift": [0.1, 0.25],
    "first-contentful-paint": [1800, 3000],
    "total-blocking-time": [200, 600],
    "speed-index": [3400, 5800],
  };
  const [good, poor] = thresholds[id] || [0, 0];
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

export async function getCoreWebVitals(url: string): Promise<CoreWebVitals | null> {
  const apiKey = process.env.PAGESPEED_API_KEY;

  try {
    const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    apiUrl.searchParams.set("url", url);
    apiUrl.searchParams.set("strategy", "mobile");
    apiUrl.searchParams.set("category", "performance");
    if (apiKey) apiUrl.searchParams.set("key", apiKey);

    const res = await fetch(apiUrl.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const data = await res.json();
    const audits = data.lighthouseResult?.audits;
    const score = data.lighthouseResult?.categories?.performance?.score;

    if (!audits || score === undefined) return null;

    const lcpVal = audits["largest-contentful-paint"]?.numericValue || 0;
    const clsVal = audits["cumulative-layout-shift"]?.numericValue || 0;
    const fcpVal = audits["first-contentful-paint"]?.numericValue || 0;
    const tbtVal = audits["total-blocking-time"]?.numericValue || 0;
    const siVal = audits["speed-index"]?.numericValue || 0;

    return {
      performanceScore: Math.round(score * 100),
      lcp: { value: lcpVal, rating: getRating("largest-contentful-paint", lcpVal) },
      cls: { value: clsVal, rating: getRating("cumulative-layout-shift", clsVal) },
      fcp: { value: fcpVal, rating: getRating("first-contentful-paint", fcpVal) },
      tbt: { value: tbtVal, rating: getRating("total-blocking-time", tbtVal) },
      si: { value: siVal, rating: getRating("speed-index", siVal) },
    };
  } catch (error) {
    console.error("PageSpeed Insights error:", error);
    return null;
  }
}
