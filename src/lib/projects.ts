import { getCollection } from "astro:content";

export async function getFeaturedProjects() {
  const projects = await getCollection("projects", ({ data }) => data.featured);
  return projects.toSorted((a, b) => b.data.dateCreated.valueOf() - a.data.dateCreated.valueOf());
}
