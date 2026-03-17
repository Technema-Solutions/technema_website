import {
  getAdminNavigationLinks,
  getAdminIndustries,
} from "@/lib/actions/navigation";
import NavigationClient from "./NavigationClient";

export default async function AdminNavigationPage() {
  const [navLinks, industries] = await Promise.all([
    getAdminNavigationLinks(),
    getAdminIndustries(),
  ]);
  return <NavigationClient navLinks={navLinks} industries={industries} />;
}
