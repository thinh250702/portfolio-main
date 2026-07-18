import { Router } from "express";

const router = Router();

router.get('/', function(req, res, next) {
  res.render('pages/projects', { title: 'Projects' });
});

router.get('/:projectId', function(req, res, next) {
  console.log(req.params)
  res.render('pages/project-details', { title: 'Project Details' });
});

export default router;