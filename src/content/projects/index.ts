import { devLife } from "./dev-life";
import { nongplatoo } from "./nongplatoo";
import type { ProjectRecord } from "../schema";

export const projects: readonly ProjectRecord[] = [nongplatoo, devLife];

export const selectedProjects = projects
  .filter((project) => project.showInSelectedSystems)
  .toSorted((a, b) => a.featuredOrder - b.featuredOrder);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export { devLife, nongplatoo };
