import projectService from "../services/project.service.js";

const getProjects = async(req, res) => {
  const data = await projectService.getWorkPage();
  const projects = await projectService.getAllProjects();
  res.render('pages/projects', { title: 'Work', ...data, projects});
}

const getProjectDetail = async(req, res, next) => {
  try {
    const project = await projectService.getProjectBySlug(req.params.slug)
    res.render('pages/project-details', { title: `${project.title}`, showToc: true, ...project });
  } catch (err) {
    next(err);
  }
}

export default {
  getProjects,
  getProjectDetail
}