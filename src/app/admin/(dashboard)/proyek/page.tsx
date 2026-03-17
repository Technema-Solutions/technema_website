import { getAdminProjects } from "@/lib/actions/projects";
import ProjectListClient from "./ProjectListClient";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();
  return <ProjectListClient projects={projects} />;
}
