import { loadJson } from "../utils/json.js";

const getHomePage = async () => {
  return await loadJson("pages/home.json");
}

export default {
  getHomePage
}