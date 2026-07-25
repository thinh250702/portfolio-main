import { Router } from "express";
import projectController from "../controllers/project.controller.js";

const router = Router();

router.get('/', projectController.getProject);

router.get('/:slug', projectController.getProjectDetail);

// router.get('/good-sips-coffee', function(req, res, next) {
//   console.log(req.params)
//   res.render('pages/good-sips-coffee', { title: 'Project Details' });
// });

export default router;