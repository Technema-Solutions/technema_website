import { getAdminMessages } from "@/lib/actions/contact";
import PesanClient from "./PesanClient";

export default async function AdminMessagesPage() {
  const messages = await getAdminMessages();
  return <PesanClient messages={messages} />;
}
