import projectService from "../services/project.service.js";

const getProjects = async(req, res) => {
  const data = await projectService.getWorkPage();
  const projects = await projectService.getAllProjects();
  res.render('pages/projects', { title: 'Work', ...data, projects});
}

const getProjectDetail = async(req, res, next) => {
  try {
    const slug = req.params.slug;
    const projects = await projectService.getAllProjects();
    const project = await projectService.getProjectBySlug(slug);
    const recommendedProjects = projects.filter(
      item => item.slug !== slug
    );
    console.log(recommendedProjects)
    res.render('pages/project-details', { title: `${project.title}`, showToc: true, recommend: recommendedProjects, ...project });
  } catch (err) {
    next(err);
  }
}

export default {
  getProjects,
  getProjectDetail
}