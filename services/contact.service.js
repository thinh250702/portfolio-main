import { loadJson } from "../utils/json.js";

const getContactPage = async () => {
  return await loadJson("pages/contact.json");
}

export default {
  getContactPage
}