import { getAdminServices } from "@/lib/actions/services";
import ServiceListClient from "./ServiceListClient";

export default async function AdminServicesPage() {
  const services = await getAdminServices();
  return <ServiceListClient services={services} />;
}
