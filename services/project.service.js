import { loadJson } from "../utils/json.js";

const getWorkPage = async () => {
  return await loadJson("pages/work.json");
}

const getAllProjects = async () => {
  return await loadJson("projects/listing.json");
}

const getProjectBySlug = async (slug) => {
  return await loadJson(`projects/${slug}.json`);
}

const getRecommendedProjects = async (slug, limit = 2) => {
  const projects = await loadJson("projects/listing.json");
  return projects
    .filter(project => project.slug !== slug)
    .slice(0, limit);
}

export default {
  getWorkPage,
  getAllProjects,
  getProjectBySlug,
  getRecommendedProjects
}