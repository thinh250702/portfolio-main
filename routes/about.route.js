import { Router } from "express";

const router = Router();

router.get('/', function(req, res, next) {
  res.render('pages/about', { title: 'About' });
});

export default router;