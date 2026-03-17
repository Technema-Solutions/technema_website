import { getAdminClients } from "@/lib/actions/clients";
import ClientListClient from "./ClientListClient";

export default async function AdminClientsPage() {
  const clients = await getAdminClients();
  return <ClientListClient clients={clients} />;
}
