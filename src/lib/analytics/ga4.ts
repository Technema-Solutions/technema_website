import { google } from "googleapis";
import { getGoogleAuth } from "./google-auth";

const propertyId = process.env.GA4_PROPERTY_ID || "";

function getAnalyticsData() {
  const auth = getGoogleAuth();
  if (!auth) return null;
  return google.analyticsdata({ version: "v1beta", auth });
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return formatDate(d);
}

export interface GA4OverviewStats {
  activeUsers: number;
  sessions: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  newUsers: number;
}

export async function getOverviewStats(): Promise<GA4OverviewStats | null> {
  const client = getAnalyticsData();
  if (!client || !propertyId) return null;

  try {
    const res = await client.properties.runReport({
      property: propertyId,
      requestBody: {
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "bounceRate" },
          { name: "averageSessionDuration" },
          { name: "newUsers" },
        ],
      },
    });

    const row = res.data.rows?.[0]?.metricValues;
    if (!row) return null;

    return {
      activeUsers: parseInt(row[0]?.value || "0"),
      sessions: parseInt(row[1]?.value || "0"),
      pageViews: parseInt(row[2]?.value || "0"),
      bounceRate: parseFloat(row[3]?.value || "0"),
      avgSessionDuration: parseFloat(row[4]?.value || "0"),
      newUsers: parseInt(row[5]?.value || "0"),
    };
  } catch (error) {
    console.error("GA4 overview error:", error);
    return null;
  }
}

export interface DailyVisitor {
  date: string;
  users: number;
  sessions: number;
}

export async function getDailyVisitors(days = 30): Promise<DailyVisitor[]> {
  const client = getAnalyticsData();
  if (!client || !propertyId) return [];

  try {
    const res = await client.properties.runReport({
      property: propertyId,
      requestBody: {
        dateRanges: [{ startDate: getDaysAgo(days), endDate: "today" }],
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
        ],
        orderBys: [{ dimension: { dimensionName: "date", orderType: "ALPHANUMERIC" } }],
      },
    });

    return (res.data.rows || []).map((row) => ({
      date: row.dimensionValues?.[0]?.value || "",
      users: parseInt(row.metricValues?.[0]?.value || "0"),
      sessions: parseInt(row.metricValues?.[1]?.value || "0"),
    }));
  } catch (error) {
    console.error("GA4 daily visitors error:", error);
    return [];
  }
}

export interface TopPage {
  path: string;
  views: number;
  users: number;
}

export async function getTopPages(limit = 10): Promise<TopPage[]> {
  const client = getAnalyticsData();
  if (!client || !propertyId) return [];

  try {
    const res = await client.properties.runReport({
      property: propertyId,
      requestBody: {
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "pagePath" }],
        metrics: [
          { name: "screenPageViews" },
          { name: "activeUsers" },
        ],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: String(limit),
      },
    });

    return (res.data.rows || []).map((row) => ({
      path: row.dimensionValues?.[0]?.value || "",
      views: parseInt(row.metricValues?.[0]?.value || "0"),
      users: parseInt(row.metricValues?.[1]?.value || "0"),
    }));
  } catch (error) {
    console.error("GA4 top pages error:", error);
    return [];
  }
}

export interface DeviceBreakdown {
  device: string;
  sessions: number;
}

export async function getDeviceBreakdown(): Promise<DeviceBreakdown[]> {
  const client = getAnalyticsData();
  if (!client || !propertyId) return [];

  try {
    const res = await client.properties.runReport({
      property: propertyId,
      requestBody: {
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      },
    });

    return (res.data.rows || []).map((row) => ({
      device: row.dimensionValues?.[0]?.value || "unknown",
      sessions: parseInt(row.metricValues?.[0]?.value || "0"),
    }));
  } catch (error) {
    console.error("GA4 device breakdown error:", error);
    return [];
  }
}
