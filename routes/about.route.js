import { Router } from "express";
import aboutController from "../controllers/about.controller.js";

const router = Router();

router.get('/', aboutController.getAbout);


export default router;