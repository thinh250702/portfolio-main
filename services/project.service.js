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

export default {
  getWorkPage,
  getAllProjects,
  getProjectBySlug
}