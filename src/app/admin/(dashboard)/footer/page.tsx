import {
  getAdminFooterColumns,
  getAdminSocialLinks,
} from "@/lib/actions/footer";
import FooterClient from "./FooterClient";

export default async function AdminFooterPage() {
  const [columns, socialLinks] = await Promise.all([
    getAdminFooterColumns(),
    getAdminSocialLinks(),
  ]);
  return <FooterClient columns={columns} socialLinks={socialLinks} />;
}
