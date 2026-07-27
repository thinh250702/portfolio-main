import { loadJson } from "../utils/json.js";

const getHomeData = async () => {
  return await loadJson("pages/home.json");
}

export default {
  getHomeData
}