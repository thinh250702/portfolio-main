import contactController from "../controllers/contact.controller.js";
import { Router } from "express";

const router = Router();

router.get('/', contactController.getContact);

export default router;