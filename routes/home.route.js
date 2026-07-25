import { Router } from "express";

const router = Router();

router.get('/', function(req, res, next) {
  res.render('pages/home', { title: 'Thịnh Nguyễn | ©2026—Portfolio', isHomepage: true });
});

export default router;