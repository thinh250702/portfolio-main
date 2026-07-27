import { loadJson } from "../utils/json.js";

const getSettings = async () => {
  return await loadJson("settings.json");
}

export default {
  getSettings
}