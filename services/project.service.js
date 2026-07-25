import { loadJson } from "../utils/json.js";

const getProjectData = async () => {
  return await loadJson("pages/work.json");
}

const getProjectBySlug = async (slug) => {
  return await loadJson(`projects/${slug}.json`);
}

export default {
  getProjectData,
  getProjectBySlug
}