import { getAdminMedia } from "@/lib/actions/media";
import MediaClient from "./MediaClient";

export default async function AdminMediaPage() {
  const media = await getAdminMedia();
  return <MediaClient media={media} />;
}
