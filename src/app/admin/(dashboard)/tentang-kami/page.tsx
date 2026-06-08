import { getAdminAboutPage } from "@/lib/actions/about";
import AboutClient from "./AboutClient";

export default async function AdminAboutPage() {
  const about = await getAdminAboutPage();
  return <AboutClient about={about} />;
}
