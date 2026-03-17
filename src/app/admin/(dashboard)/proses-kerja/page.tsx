import { getAdminProcessSteps } from "@/lib/actions/workingProcess";
import ProcessListClient from "./ProcessListClient";

export default async function AdminProcessPage() {
  const steps = await getAdminProcessSteps();
  return <ProcessListClient steps={steps} />;
}
