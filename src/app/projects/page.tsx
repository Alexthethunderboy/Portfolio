import ProjectList from "@/components/ui/ProjectList";
import { getProjects } from "@/lib/get-projects";
export const revalidate = 60;
export default async function ProjectsPage() {
  return <ProjectList projects={await getProjects()} />;
}
