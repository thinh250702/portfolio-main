import { loadJson } from "../utils/json.js";

const getBrands = async () => {
  return await loadJson("sections/brands.json");
}

const getContactForm = async () => {
  return await loadJson("sections/contact.json");
}

const getQuote = async () => {
  return await loadJson("sections/quote.json");
}

const getSkills = async () => {
  return await loadJson("sections/skills.json");
}

export default {
  getBrands,
  getContactForm,
  getQuote,
  getSkills
}