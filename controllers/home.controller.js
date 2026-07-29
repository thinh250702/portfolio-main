import homeService from "../services/home.service.js";
import projectService from "../services/project.service.js";
import sectionService from "../services/section.service.js";

const getHome = async(req, res) => {
  const data = await homeService.getHomePage();
  const projects = await projectService.getAllProjects();
  const brands = await sectionService.getBrands();
  const contactForm = await sectionService.getContactForm();
  const skills = await sectionService.getSkills();
  res.render('pages/home', { title: 'Thịnh Nguyễn | ©2026—Portfolio', isHeaderLight: true, brands, projects, skills, contactForm, ...data });
}

export default {
  getHome
}