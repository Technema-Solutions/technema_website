import { google } from "googleapis";
import { getGoogleAuth } from "./google-auth";

function getSearchConsole() {
  const auth = getGoogleAuth();
  if (!auth) return null;
  return google.searchconsole({ version: "v1", auth });
}

export interface SearchOverview {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export async function getSearchPerformance(siteUrl: string): Promise<SearchOverview | null> {
  const client = getSearchConsole();
  if (!client || !siteUrl) return null;

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  try {
    const res = await client.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      },
    });

    const rows = res.data.rows || [];
    if (rows.length === 0) return null;

    let totalClicks = 0;
    let totalImpressions = 0;
    let totalPosition = 0;
    for (const row of rows) {
      totalClicks += row.clicks || 0;
      totalImpressions += row.impressions || 0;
      totalPosition += row.position || 0;
    }

    return {
      clicks: totalClicks,
      impressions: totalImpressions,
      ctr: totalImpressions > 0 ? totalClicks / totalImpressions : 0,
      position: rows.length > 0 ? totalPosition / rows.length : 0,
    };
  } catch (error) {
    console.error("Search Console performance error:", error);
    return null;
  }
}

export interface SearchQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export async function getTopQueries(siteUrl: string, limit = 10): Promise<SearchQuery[]> {
  const client = getSearchConsole();
  if (!client || !siteUrl) return [];

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  try {
    const res = await client.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        dimensions: ["query"],
        rowLimit: limit,
      },
    });

    return (res.data.rows || []).map((row) => ({
      query: row.keys?.[0] || "",
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    }));
  } catch (error) {
    console.error("Search Console queries error:", error);
    return [];
  }
}

export interface SearchPage {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export async function getTopSearchPages(siteUrl: string, limit = 10): Promise<SearchPage[]> {
  const client = getSearchConsole();
  if (!client || !siteUrl) return [];

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  try {
    const res = await client.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        dimensions: ["page"],
        rowLimit: limit,
      },
    });

    return (res.data.rows || []).map((row) => ({
      page: row.keys?.[0] || "",
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    }));
  } catch (error) {
    console.error("Search Console pages error:", error);
    return [];
  }
}
