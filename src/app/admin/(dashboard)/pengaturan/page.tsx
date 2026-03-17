import { getAdminSiteSettings } from "@/lib/actions/settings";
import SettingsClient from "./SettingsClient";

export default async function AdminSettingsPage() {
  const settings = await getAdminSiteSettings();
  return <SettingsClient settings={settings} />;
}
