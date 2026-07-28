import type { CollectionEntry } from "astro:content";

type Project = CollectionEntry<"projects">;

export function sortByDateDesc(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Featured projects first (by `order`), backfilled with the most recent remaining ones. */
export function getHomepageProjects(projects: Project[], limit = 3): Project[] {
  const featured = projects
    .filter((project) => project.data.featured)
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0))
    .slice(0, limit);

  if (featured.length >= limit) return featured;

  const featuredIds = new Set(featured.map((project) => project.id));
  const backfill = sortByDateDesc(projects).filter((project) => !featuredIds.has(project.id));

  return [...featured, ...backfill.slice(0, limit - featured.length)];
}

export function getRelatedProjects(current: Project, all: Project[], limit = 3): Project[] {
  const others = all.filter((project) => project.id !== current.id);

  const scored = others.map((project) => {
    const sharedTags = project.data.tags.filter((tag) => current.data.tags.includes(tag)).length;
    const sameCategory = project.data.category === current.data.category ? 1 : 0;
    return { project, score: sharedTags * 2 + sameCategory };
  });

  return scored
    .sort((a, b) => b.score - a.score || b.project.data.date.valueOf() - a.project.data.date.valueOf())
    .slice(0, limit)
    .map(({ project }) => project);
}
