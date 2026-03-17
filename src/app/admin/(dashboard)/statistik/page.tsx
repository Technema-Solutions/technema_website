import { getAdminStats } from "@/lib/actions/stats";
import StatListClient from "./StatListClient";

export default async function AdminStatsPage() {
  const stats = await getAdminStats();
  return <StatListClient stats={stats} />;
}
