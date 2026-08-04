import aboutService from "../services/about.service.js";
import sectionService from "../services/section.service.js";

const getAbout = async(req, res) => {
  const data = await aboutService.getAboutPage();
  const brands = await sectionService.getBrands();
  const skills = await sectionService.getSkills();
  const quote = await sectionService.getQuote();
  res.render('pages/about', {title: data.title, isAbout: true, brands, skills, quote, ...data});
}

export default {
  getAbout
}