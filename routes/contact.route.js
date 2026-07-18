import { Router } from "express";

const router = Router();

router.get('/', function(req, res, next) {
  res.render('pages/contact', { title: 'Contact' });
});

export default router;