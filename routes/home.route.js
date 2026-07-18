import { Router } from "express";

const router = Router();

router.get('/', function(req, res, next) {
  res.render('pages/home', { title: 'Homepage', isHomepage: true });
});

export default router;