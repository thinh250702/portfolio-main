import { loadJson } from "../utils/json.js";

const getAboutPage = async () => {
  return await loadJson("pages/about.json");
}

export default {
  getAboutPage
}