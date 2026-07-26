import { Router } from "express";
import projectController from "../controllers/project.controller.js";

const router = Router();

router.get('/', projectController.getProjects);

router.get('/:slug', projectController.getProjectDetail);

export default router;