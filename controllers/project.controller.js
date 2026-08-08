import projectService from "../services/project.service.js";

const getProjects = async(req, res) => {
  const data = await projectService.getWorkPage();
  const projects = await projectService.getAllProjects();

  res.render('pages/projects', { title: data.title, ...data, projects});
}

const getProjectDetail = async(req, res, next) => {
  try {
    const slug = req.params.slug;
    const project = await projectService.getProjectBySlug(slug);
    const recommendedProjects = await projectService.getRecommendedProjects(slug);

    res.locals.showToc = true

    res.render('pages/project-details', { title: `${project.title}`, recommend: recommendedProjects, ...project });
  } catch (err) {
    next(err);
  }
}

export default {
  getProjects,
  getProjectDetail
}