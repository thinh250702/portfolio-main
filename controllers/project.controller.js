import createError from 'http-errors';

import projectService from "../services/project.service.js";

const getProject = async(req, res) => {
  const data = await projectService.getProjectData();
  res.render('pages/projects', { title: 'Projects', ...data});
}

const getProjectDetail = async(req, res, next) => {
  try {
    const project = await projectService.getProjectBySlug(req.params.slug)
    res.render('pages/project-details', { title: 'Project Details', ...project });
  } catch (err) {
    next(err);
  }
}

export default {
  getProject,
  getProjectDetail
}