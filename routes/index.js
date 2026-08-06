import { Router } from "express";

import homeRoutes from './home.route.js'
import aboutRoutes from './about.route.js'
import projectRoutes from './project.route.js'
import contactRoutes from './contact.route.js'

const router = Router();

router.use("/", homeRoutes);
router.use("/about", aboutRoutes);
router.use("/works", projectRoutes);
router.use("/contact", contactRoutes);

export default router;
